!function() {
    var crypto = require("crypto");
    var ckey = crypto.enc.Base64.parse("#base64Key#");
    var iv = crypto.enc.Base64.parse("#base64IV#");
    var CONFIG = {
        DISABLE: false,
        CACHE_EXPIRATION_INTERVAL: 30
    };
    Ti.App.mCache = function() {
        var initCache, expireCache, currentTimestamp, get, put, del;
        initCache = function(cache_expiration_interval) {
            var db = Titanium.Database.open("cache");
            db.execute("CREATE TABLE IF NOT EXISTS cache (key TEXT UNIQUE, value TEXT, expiration INTEGER)");
            db.close();
            Ti.API.info("[CACHE] INITIALIZED");
            if (CONFIG) {
                setInterval(expireCache, 1e3 * cache_expiration_interval);
                Ti.API.info("[CACHE] Will expire objects each " + cache_expiration_interval + " seconds");
            } else Ti.API.info("going here in [CACHE]");
        };
        expireCache = function() {
            var db = Titanium.Database.open("cache");
            var timestamp = currentTimestamp();
            var count = 0;
            var rs = db.execute("SELECT COUNT(*) FROM cache WHERE expiration <= ?", timestamp);
            while (rs.isValidRow()) {
                count = rs.field(0);
                rs.next();
            }
            rs.close();
            db.execute("DELETE FROM cache WHERE expiration <= ?", timestamp);
            db.close();
            Ti.API.debug("[CACHE] EXPIRATION: [" + count + "] object(s) expired");
        };
        currentTimestamp = function() {
            var value = Math.floor(new Date().getTime() / 1e3);
            Ti.API.debug("[CACHE] currentTimestamp=" + value);
            return value;
        };
        get = function(key) {
            var db = Titanium.Database.open("cache");
            var _key = crypto.AES.encrypt(key, ckey, {
                iv: iv
            });
            _key = "'" + _key + "'";
            var query = 'SELECT value FROM cache WHERE key like "' + _key + '"';
            var rs = db.execute(query);
            var result = null;
            if (rs.isValidRow()) {
                Ti.API.info("[CACHE] GET: key[" + key + "]");
                try {
                    var rowValue = rs.fieldByName("value");
                    rowValue = rowValue.slice(1, rowValue.length - 1);
                    var _data = rowValue;
                    var decrypted = crypto.AES.decrypt(_data, ckey, {
                        iv: iv
                    });
                    var data = decrypted.toString(crypto.enc.Utf8);
                    result = JSON.parse(data);
                } catch (exp) {
                    Ti.API.info("expection-->" + exp.message);
                }
            } else Ti.API.info("[CACHE] Missed: key[" + key + "]");
            rs.close();
            db.close();
            return result;
        };
        put = function(key, value, expiration_seconds) {
            expiration_seconds || (expiration_seconds = 300);
            var expires_in = currentTimestamp() + expiration_seconds;
            var db = Titanium.Database.open("cache");
            Ti.API.info("[CACHE] PUT: time=" + currentTimestamp() + ", expires_in=" + expires_in);
            var query = "INSERT OR REPLACE INTO cache (key, value, expiration) VALUES (?, ?, ?);";
            try {
                var _key = crypto.AES.encrypt(key, ckey, {
                    iv: iv
                });
                var _value = crypto.AES.encrypt(JSON.stringify(value), ckey, {
                    iv: iv
                });
                db.execute(query, "'" + _key + "'", "'" + _value + "'", expires_in);
                db.close();
            } catch (exp) {
                Ti.API.info("insert exception-->" + exp.message);
            }
        };
        del = function(key) {
            var db = Titanium.Database.open("cache");
            db.execute("DELETE FROM cache WHERE key = ?", key);
            db.close();
            Ti.API.info("[CACHE] DEL: key[" + key + "]");
        };
        return function() {
            if (CONFIG && CONFIG.DISABLE) return {
                get: function() {},
                put: function() {},
                del: function() {}
            };
            var cache_expiration_interval = 5;
            CONFIG && CONFIG.CACHE_EXPIRATION_INTERVAL && (cache_expiration_interval = CONFIG.CACHE_EXPIRATION_INTERVAL);
            initCache(cache_expiration_interval);
            return {
                get: get,
                put: put,
                del: del
            };
        }();
    }(CONFIG);
}();