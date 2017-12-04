/***************************************************
 Titanium mCache

 Joe Maffia
 http://about.me/joemaffia

 A cache module to be used for Titanium app. http://www.appcelerator.com/
 It uses the local SQLite database to cache strings and JavaScript objects.

 Usage:
 // A simple call to get the cached object, will return NULL if empty
 var cachedObj = Ti.App.mCache.get('foo');

 // How to cache a new object. By default will stay in cache for 5seconds
 // otherwise change the CACHE_EXPIRATION_INTERVAL or pass the parameter to the call.
 var aNewObject = { property: 'value' };
 Ti.App.mCache.put('foo', aNewObject);

 // setting the cache expiring time to 1min
 Ti.App.mCache.put('foo', aNewObject, 60);

 // Delete the object from the cache...we don't wanna wait the expiring time.
 Ti.App.mCache.del('foo');
 ***************************************************/

(function() {
    var crypto = require("crypto");
    var ckey = crypto.enc.Base64.parse("#base64Key#");
    var iv = crypto.enc.Base64.parse("#base64IV#");

   // Ti.API.info('ckey**********' + ckey);
   // Ti.API.info('iv**********' + iv);

    var CONFIG = {
        // Disables cache (development purpose).
        DISABLE : false,

        // Objects will be deleted after this interval. (seconds)
        CACHE_EXPIRATION_INTERVAL : 30
    };

    Ti.App.mCache = function() {
        var initCache,
            expireCache,
            currentTimestamp,
            get,
            put,
            del;

        // Cache initialization
        initCache = function(cache_expiration_interval) {
            var db = Titanium.Database.open('cache');
            db.execute('CREATE TABLE IF NOT EXISTS cache (key TEXT UNIQUE, value TEXT, expiration INTEGER)');
            db.close();
            Ti.API.info('[CACHE] INITIALIZED');

            if (CONFIG) {
                // set cache expiration task
                setInterval(expireCache, cache_expiration_interval * 1000);
                Ti.API.info('[CACHE] Will expire objects each ' + cache_expiration_interval + ' seconds');
            } else {
                Ti.API.info('going here in [CACHE]');
            }
        };

        expireCache = function() {
            //Ti.API.info('expire Cache');
            var db = Titanium.Database.open('cache');
            var timestamp = currentTimestamp();

            // count how many objects will be deleted
            var count = 0;
            //Ti.API.info('SELECT COUNT(*) FROM cache WHERE expiration <= ?', timestamp);
            var rs = db.execute('SELECT COUNT(*) FROM cache WHERE expiration <= ?', timestamp);
            while (rs.isValidRow()) {
                count = rs.field(0);
                rs.next();
            }
            rs.close();

            // deletes everything older than timestamp
            db.execute('DELETE FROM cache WHERE expiration <= ?', timestamp);
            db.close();

            Ti.API.debug('[CACHE] EXPIRATION: [' + count + '] object(s) expired');
        };

        currentTimestamp = function() {
            var value = Math.floor(new Date().getTime() / 1000);
            Ti.API.debug("[CACHE] currentTimestamp=" + value);
            return value;
        };

        get = function(key) {
            var db = Titanium.Database.open('cache');
            // Ti.API.info('key' + key);
            //Ti.API.info('********key de ********' + Ti.Utils.base64encode(key));

            //var decrypted = crypto.AES.decrypt(key, "Ddecor");
            //var _key = decrypted.toString(crypto.enc.Utf8);

           // Ti.API.info('select key *************' + key);

            //var _key = (crypto.AES.encrypt(key, "neo")).toString();
            var _key = crypto.AES.encrypt(key, ckey, {
                iv : iv
            });

            //Ti.API.info('decrypted------------>' + _key);

            //var query = "SELECT value FROM cache WHERE key like " + "'" + Ti.Utils.base64encode(key) + "'";
            _key = "'" + _key + "'";

            var query = "SELECT value FROM cache WHERE key like " + "\"" + _key + "\"";

            //Ti.API.info('query---------->' + query);

            var rs = db.execute(query);
            //var rs = db.execute('SELECT value FROM cache WHERE key like ', Ti.Utils.base64encode(key) );
            //var rs = db.execute('SELECT value FROM cache WHERE key = ?',(key));
            var result = null;
            if (rs.isValidRow()) {
                Ti.API.info('[CACHE] GET: key[' + key + ']');

                //result = JSON.parse(rs.fieldByName('value'));

                //var data = Ti.Utils.base64decode((rs.fieldByName('value')));
                try {

            var rowValue = rs.fieldByName('value');
            //var firstIndex = rowValue.indexOf("'");
                //var lastIndex = rowValue.lastIndexOf("'");

                rowValue = rowValue.slice(1,(rowValue.length-1)); 
                
                //Ti.API.info('rowValue--->' + rowValue);



                    var _data = (rowValue);
                    
                    var decrypted = crypto.AES.decrypt(_data, ckey, {
                        iv : iv
                    });
                    
                    var data = decrypted.toString(crypto.enc.Utf8);

                    //Ti.API.info('decrypted****************' + data);

                    result = JSON.parse(data);

                } catch(exp) {
                    Ti.API.info('expection-->' + exp.message);
                }

            } else {
                Ti.API.info('[CACHE] Missed: key[' + key + ']');
            }
            rs.close();
            db.close();

            return result;
        };

        put = function(key, value, expiration_seconds) {
            if (!expiration_seconds) {
                expiration_seconds = 300;
            }
            var expires_in = currentTimestamp() + expiration_seconds;
            var db = Titanium.Database.open('cache');
            Ti.API.info('[CACHE] PUT: time=' + currentTimestamp() + ', expires_in=' + expires_in);
            //var query = 'INSERT OR REPLACE INTO cache (key, value, expiration) VALUES (?, ?, ?);';
            var query = "INSERT OR REPLACE INTO cache (key, value, expiration) VALUES (?, ?, ?);";
            //db.execute(query, key, JSON.stringify(value), expires_in);

            //var _key = Ti.Utils.base64encode(key);
            //var _value = Ti.Utils.base64encode(JSON.stringify(value));

            try {

                //Ti.API.info('insert key *************' + key);
                //Ti.API.info('insert value *************' + JSON.stringify(value));

                //var text = "#rawString#";

                var _key = crypto.AES.encrypt(key, ckey, {
                    iv : iv
                });
                
                var _value = crypto.AES.encrypt(JSON.stringify(value), ckey, {
                    iv : iv
                });

                //var _key = (crypto.AES.encrypt(key, "neo")).toString();
                //var _value = (crypto.AES.encrypt(JSON.stringify(value), "neo")).toString();

                //Ti.API.info('_key----------->' + _key);
                //Ti.API.info('_value----------->' + _value);

                //var decrypted = crypto.AES.decrypt(encrypted, "Ddecor");

                //db.execute(query,   "oYBSAW6Cs+JwYYctyC0px3iS1yJ7xfEqk9OcgP+u4WPiui9Va/PYI16n8fNxRMEML5nElQC/eXWDJoxmEDy4Xw=="    , "zZPaJrtwH5A6neL+QS10PNHQDJMUZv/SUCC8Fr4c80tRhl6Ua0jQQv9HnjF35VHmiJqO+gOibBnPt2UWFhu64kA4Jm3wLbn2867pFDaBkHd62IenvCde+lH7D6DTb05qMe+rCnhuRpsK2pgwdNXzBwhae7WUUYAfF6cTuhoWXAVm1gin6ktMnoKAvsPhKJk2AD+J+gNyXPs6kUfx5WjbHsV8JEItoIDQGSgbZqWYfsh8ENnWr71+CuKRQ52GGqGcmBsYmX7ijdpqwrznLU6V7ReDW86V7ad9mVmlNuOa07WFOeMxQnQvPpshm5wgTzlzOifnZWUmNhCCQlInUn3tJERXptIrZFzpcBMU4iLYVMHz+q7KUV6pT/Y/fcfV22tmaYJ4u0ILNbAIuCrxXYntikwW5SUCUT6diNX/du1Rbj/WcMfmV16wV3AU8lDmCpZi6qkuNFFlB5mU4ZakC7QxcFpMCFy2ZLBzvw2kFlUbD2DPV6o00LCPMIAg6vXVYMqyAJ/gf1KlHhosjZqa8eAo4AGoXiXic0qh6gqHPuTpxOkvhKRVThsy9OakVytULHXAgZCp0iJFpV8E9Bpr5nDVfP2X9VQWcBHvp4ieWcGI0wH5EJUpkTNl520Jiav72FuYmar91CLJ6EVh8eliswv6aeYm/sEX8WmylDMVejwECkdX5+xOVqvnaFYuiOTx+Gfxh4Ssolxbr6Hb1MOArMXdgYwHCVbp2g1ExQg+VjRhYIrMAxtyNMBrBS8tXgsY9DVGkg5MWxLmMK+ry7zbMb1/ERec3oVuF9IAMGhbfE2W2tfxVjCeEAps+pZvBFP1+KGLdJOuFRw/qFbqZj7IRpkTdXMqOhDGEoYhrYI623msR0+XiRuHVFJX2SbT2d0lyrqcwNe8VBP7BNSH+bsdnIx6yb4B05CE/UTvOSCzmzM90BSJ0/iVYIzd1HI+Vc1SRSKBh1a6eL1mxRQ2sik3Rkh30EIfqAvJe9lJUQOeX4O3QvvXSlVh8WDAxOIA8g4q0cRV/vevz3zE+U7YJfPlIyLW8y7EKzVQRph8g80C0T/33LCoZKbzQ2hgVzrumnYE7cTa7tKLp2cqXWakKvG9WfF3Sse8a+/Q3XC2KZE3PilM5jiZk6jmwzHoHwg2kDVidOJXqrmj/A1jlQc2p7rwq6b6BmbkhptcLJ/CcQakvK2pp3QvqSmxNL3ddILhnkylpVmhQnlW/ervAJ4Z0qNujRRZltVU9nB5j/TKa/pLYE8HS6A1WWHS+uxgANtVKxJOtKoiswOibJ/I0RsYmvR+KblagdZ76EZyjzohKYv1V5E4v8P3fnSHZmCvO0X9Q1mFC1jHpUrThTrZLyJsxLJaoX7DxFwRKTFUZxnXeybX5EBaP2T1OLFDfFcg6Oe7+fFxOaSJOphL6tsH67KIEEpykSj6MBmN5NxsDmGszdxqq4hlh+DAVljFX67+w9LKi9DGldNbJnud4TxNOO/MVKY6rpExzASs6S/76dAeDnrbYo1UtWWCMO7maXNK+i/OSBTfcPEQl9nEyCH908hcaA5KDZq4qjPFZ8dADVwL6wgtGKT6M3JpspQ/egPT6g7bxyvW1lbfTKUBSH7WmdTLE+SMIH9uWYuwOmIB6oduyW0HmbuaXwaCTNg+iCGe73WZQShnc+LsQvmTHsrrPSr7iaMWQN5zVZFFfK9/8Ct+gBd1JWQdJslc1uwtw4sn9zhFRToH/zMvWvx/XAuMi2Btfjp+NPerTbHlnbOeVsj1rvOeP6fC6BzI5H/AURxK6WUxCOImu6uF6keNjsZZBxjXN0MLKPvmUlZotkMSpFlCwLxufGr7VBs=", expires_in);

                db.execute(query, "'" + _key + "'", "'" + _value + "'", expires_in);

                db.close();

            } catch(exp) {
                Ti.API.info('insert exception-->' + exp.message);
            }
        };

        del = function(key) {
            var db = Titanium.Database.open('cache');
            db.execute('DELETE FROM cache WHERE key = ?', key);
            db.close();
            Ti.API.info('[CACHE] DEL: key[' + key + ']');
        };

        return function() {
            // if development environment, disable cache capabilities
            if (CONFIG && CONFIG.DISABLE) {
                return {
                    get : function() {
                    },
                    put : function() {
                    },
                    del : function() {
                    }
                };
            }

            // initialize everything
            var cache_expiration_interval = 5;
            if (CONFIG && CONFIG.CACHE_EXPIRATION_INTERVAL) {
                cache_expiration_interval = CONFIG.CACHE_EXPIRATION_INTERVAL;
            }

            initCache(cache_expiration_interval);

            return {
                get : get,
                put : put,
                del : del
            };
        }();

    }(CONFIG);

})();
