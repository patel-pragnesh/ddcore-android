function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function fetchGeolocation(value) {
        var url = "http://maps.google.com/maps/api/geocode/json?address=" + value;
        var client = Ti.Network.createHTTPClient({
            onload: function(e) {
                Ti.API.info("Received text: " + this.responseText);
                var data = JSON.parse(this.responseText);
                if (data.results.length > 0) {
                    var searchGeoLocation = {
                        latitude: data.results[0].geometry.location.lat,
                        longitude: data.results[0].geometry.location.lng
                    };
                    getLatLan(searchGeoLocation);
                } else {
                    var searchGeoLocation = {
                        latitude: 0,
                        longitude: 0
                    };
                    getLatLan(searchGeoLocation);
                }
            },
            onerror: function(e) {
                Ti.API.debug(e.error);
                var searchGeoLocation = {
                    latitude: 0,
                    longitude: 0
                };
                getLatLan(searchGeoLocation);
            },
            timeout: 5e3
        });
        client.open("GET", url);
        client.send();
    }
    function enableSearch() {
        if (mapViewVisible) {
            $.searchField.focus();
            $.map_container.visible = false;
            $.goToPop.visible = false;
            $.ListPagePop.visible = false;
            $.findStoreMailView.visible = true;
            mapViewVisible = false;
            $.searchField.visible = true;
            $.screenLbl.visible = false;
        } else if (0 != $.searchField.value.length) tempCall($.searchField.value); else {
            $.searchField.focus();
            $.searchField.visible = true;
            $.screenLbl.visible = false;
        }
        $.searchField.focus();
    }
    function getLocation() {
        coord = null;
        if (Ti.Geolocation.locationServicesEnabled) {
            Ti.Geolocation.purpose = "Receive User Location";
            Titanium.Geolocation.getCurrentPosition(function(e) {
                coord = e.coords;
                if (null != coord) if (args.inStore) getDirectionforInStore(); else {
                    showLoader($.findStore);
                    var param = {
                        latitude: coord.latitude,
                        longitude: coord.longitude,
                        filter: "All",
                        storetype: "All"
                    };
                    var requestMethod = Alloy.Globals.commonUrl.storeList;
                    var requestParams = JSON.stringify(param);
                    Alloy.Globals.webServiceCall(requestMethod, requestParams, _getStoreListSuccessCallback, _getStoreListErrorCallback, "POST", $.findStore);
                } else {
                    coord = null;
                    setTimeout(function() {
                        geolocation();
                    }, 1500);
                    showAlert($.findStore, "Allow location access for D'Decor app by going to Settings");
                }
            });
        } else {
            coord = null;
            setTimeout(function() {
                geolocation();
            }, 1500);
            showAlert($.findStore, "Allow location access for D'Decor app by going to Settings");
        }
    }
    function _getStoreListSuccessCallback(response) {
        Ti.API.info("response.data.store_list.length  =" + response.data.store_list.length);
        if (0 != response.data.store_list.length) {
            0 != $.searchField.value.length && googleAnalyticsStoreSearch($.searchField.getValue());
            storeLocatorResponseData = response;
            addFilters(response.data.filters);
            setStoreList(response.data.store_list);
            hideLoader();
        } else {
            Ti.API.info("inside else");
            showAlert($.findStore, "No nearby stores found, try searching another location");
            var fabricListData = [];
            $.listSection1.setItems(fabricListData);
            $.listSection2.setItems(fabricListData);
            $.listSection3.setItems(fabricListData);
            storeLocatorResponseData = null;
            hideLoader();
        }
    }
    function _getStoreListErrorCallback(response) {
        Ti.API.info("getStoreListErrorCallback-->" + JSON.stringify(response));
        hideLoader();
        showAlert(args.mainWindow, response.message);
    }
    function setStoreList(response) {
        setStoreListFabric(response);
        setStoreListBlind(response);
        setBeddingList(response);
    }
    function scrollEffect(e) {
        isNaN(e.currentPageAsFloat * (Ti.Platform.displayCaps.platformWidth / 3 * val)) || false !== chkClicked || ($.vwToAnimate.left = e.currentPageAsFloat * (Ti.Platform.displayCaps.platformWidth / (3 * val)));
        if (0 == $.storeLocators.getCurrentPage()) {
            $.shopingBagLbl.applyProperties(style1);
            $.reviewLbl.applyProperties(style);
            $.beddingLbl.applyProperties(style);
        } else if (1 == $.storeLocators.getCurrentPage()) {
            $.reviewLbl.applyProperties(style1);
            $.shopingBagLbl.applyProperties(style);
            $.beddingLbl.applyProperties(style);
        } else {
            $.beddingLbl.applyProperties(style1);
            $.shopingBagLbl.applyProperties(style);
            $.reviewLbl.applyProperties(style);
        }
    }
    function toggleLabelEffect1(e) {
        chkClicked = true;
        $.shopingBagLbl.applyProperties(style1);
        $.reviewLbl.applyProperties(style);
        $.storeLocators.scrollToView(0);
        $.vwToAnimate.animate({
            left: "0",
            duration: 200
        }, function() {
            chkClicked = false;
        });
    }
    function toggleLabelEffect2(e) {
        chkClicked = true;
        $.reviewLbl.applyProperties(style1);
        $.shopingBagLbl.applyProperties(style);
        $.storeLocators.scrollToView(1);
        $.vwToAnimate.animate({
            left: "33%",
            duration: 200
        }, function() {
            chkClicked = false;
        });
    }
    function toggleLabelEffect3(e) {
        chkClicked = true;
        $.beddingLbl.applyProperties(style1);
        $.shopingBagLbl.applyProperties(style);
        $.reviewLbl.applyProperties(style);
        $.storeLocators.scrollToView(2);
        $.vwToAnimate.animate({
            left: "66%",
            duration: 200
        }, function() {
            chkClicked = false;
        });
    }
    function destroyWindow(e) {
        if (mapViewVisible) if (args.inStore) $.findStore.close(); else {
            $.map_container.visible = false;
            $.goToPop.visible = false;
            $.ListPagePop.visible = false;
            $.findStoreMailView.visible = true;
            mapViewVisible = false;
        } else {
            Alloy.Globals.popWindowInNav();
            $.findStore.close();
        }
    }
    function goToBack() {
        if ("fill" == $.fabricFilterMainView.getHeight()) {
            $.styleDropDown.borderColor = "transparent";
            $.styleDropDown.borderWidth = "0";
            $.styleDropDown.height = "35dp";
            $.fabricFilterMainView.height = "35dp";
            stateFlag = true;
        } else if ("fill" == $.blindsFilterMainView.getHeight()) {
            $.styleDropDown1.borderColor = "transparent";
            $.styleDropDown1.borderWidth = "0";
            $.styleDropDown1.height = "35dp";
            $.blindsFilterMainView.height = "35dp";
            stateFlag1 = true;
        } else if (mapViewVisible) {
            $.map_container.visible = false;
            $.goToPop.visible = false;
            $.ListPagePop.visible = false;
            $.findStoreMailView.visible = true;
            mapViewVisible = false;
        } else {
            Alloy.Globals.popWindowInNav();
            $.findStore.close();
        }
    }
    function addFilters(filters) {
        var styleOption = [];
        $.sc1.removeAllChildren();
        $.styleScroll.removeAllChildren();
        $.beddingstyleScroll.removeAllChildren();
        _.each(filters, function(value, k) {
            0 == k && ($.styleNameLbl.text = value.toUpperCase());
            styleOption[k] = Ti.UI.createLabel({
                width: Ti.UI.FILL,
                height: "35dp",
                left: "10dp",
                right: "10dp",
                color: "#333333",
                font: {
                    fontSize: "10dp",
                    fontFamily: "futura_medium_bt-webfont"
                },
                text: value.toUpperCase(),
                id: value.toUpperCase(),
                backgroundColor: "#ffffff"
            });
            "EBO" == value ? styleOption[k].setText("Exclusive stores".toUpperCase()) : "MBO" == value && styleOption[k].setText("Authorized dealers".toUpperCase());
            $.sc1.add(styleOption[k]);
        });
        var styleOption1 = [];
        _.each(filters, function(value, k) {
            0 == k && ($.styleNameLbl1.text = value.toUpperCase());
            styleOption1[k] = Ti.UI.createLabel({
                width: Ti.UI.FILL,
                height: "35dp",
                left: "10dp",
                right: "10dp",
                color: "#333333",
                font: {
                    fontSize: "10dp",
                    fontFamily: "futura_medium_bt-webfont"
                },
                text: value.toUpperCase(),
                id: value.toUpperCase(),
                backgroundColor: "#ffffff"
            });
            "EBO" == value ? styleOption1[k].setText("Exclusive stores".toUpperCase()) : "MBO" == value && styleOption1[k].setText("Authorized dealers".toUpperCase());
            $.styleScroll.add(styleOption1[k]);
        });
        var styleOption2 = [];
        _.each(filters, function(value, k) {
            0 == k && ($.styleNameLbl2.text = value.toUpperCase());
            styleOption2[k] = Ti.UI.createLabel({
                width: Ti.UI.FILL,
                height: "35dp",
                left: "10dp",
                right: "10dp",
                color: "#333333",
                font: {
                    fontSize: "10dp",
                    fontFamily: "Futura Md BT"
                },
                text: value.toUpperCase(),
                id: value.toUpperCase(),
                backgroundColor: "#ffffff"
            });
            "EBO" == value ? styleOption2[k].setText("Exclusive stores".toUpperCase()) : "MBO" == value && styleOption2[k].setText("Authorized dealers".toUpperCase());
            $.beddingstyleScroll.add(styleOption2[k]);
        });
    }
    function pinCurrentPoint(e) {
        if (!isNullVal(e)) {
            var currentBindID = isNullVal(e.bindId) ? "" : e.bindId.toLowerCase();
            if ("getdirection" == currentBindID) {
                var a = e.section.items[e.itemIndex];
                Ti.Platform.openURL("http://maps.google.com/?q=" + a.properties.latitude + "," + a.properties.longitude);
            } else {
                var a = e.section.items[e.itemIndex];
                Ti.API.info("a.properties" + JSON.stringify(a.properties));
                mapview.selectAnnotation(a.properties.title);
                mapview.setRegion({
                    animate: true,
                    latitude: a.properties.latitude,
                    longitude: a.properties.longitude,
                    latitudeDelta: .01,
                    longitudeDelta: .01
                });
                openUrlDirection = "http://maps.google.com/?q=" + a.properties.latitude + "," + a.properties.longitude;
                $.map_container.visible = true;
                $.goToPop.visible = true;
                $.ListPagePop.visible = true;
                $.findStoreMailView.visible = false;
                mapViewVisible = true;
            }
        }
    }
    function getDirectionforInStore() {
        var inStoreAnnotation = Map.createAnnotation({
            latitude: args.storeInfo.latitude,
            longitude: args.storeInfo.longitude,
            title: args.storeInfo.title,
            subtitle: args.storeInfo.subtitle,
            rightButton: "/images/arrowIcon.png",
            image: "EBO" == args.storeInfo.merchant_type ? "/images/ebo_pin.png" : "/images/mbo_pin.png",
            myid: 0
        });
        mapview = Map.createView({
            mapType: Map.NORMAL_TYPE,
            region: {
                latitude: args.storeInfo.latitude,
                longitude: args.storeInfo.longitude,
                latitudeDelta: .01,
                longitudeDelta: .01
            },
            animate: true,
            regionFit: true,
            annotations: [ inStoreAnnotation ]
        });
        $.map_container.add(mapview);
        mapview.selectAnnotation(args.storeInfo.title);
        mapview.setRegion({
            animate: true,
            latitude: args.storeInfo.latitude,
            longitude: args.storeInfo.longitude,
            latitudeDelta: .01,
            longitudeDelta: .01
        });
        mapview.addEventListener("click", function(e) {
            !isNullVal(e);
            "pin" != e.clicksource && Ti.Platform.openURL("http://maps.google.com/?q=" + e.annotation.latitude + "," + e.annotation.longitude);
            openUrlDirection = "http://maps.google.com/?q=" + e.annotation.latitude + "," + e.annotation.longitude;
        });
        $.map_container.visible = true;
        $.goToPop.visible = false;
        $.ListPagePop.visible = false;
        $.findStoreMailView.visible = false;
        mapViewVisible = true;
    }
    function applyFilter(filter, type) {
        if (!isNullVal(storeLocatorResponseData)) {
            var newData = _.where(storeLocatorResponseData.data.store_list, {
                merchant_type: filter
            });
            1 == type ? setStoreListFabric(newData) : 2 == type ? setStoreListBlind(newData) : setBeddingList(newData);
        }
    }
    function setStoreListFabric(response) {
        var storeList = response;
        var fabricListData = [];
        fabricListLocationData = [];
        var emptyFabricList = true;
        $.listSection1.setItems(fabricListData);
        _.each(storeList, function(value, k) {
            if ("FABRIC" == value.store_type) {
                emptyFabricList = false;
                if (!isNaN(value.latitude) && !isNaN(value.longitude)) {
                    fabricListData.push({
                        properties: {
                            latitude: value.latitude,
                            longitude: value.longitude,
                            title: value.store_name,
                            subtitle: value.store_address
                        },
                        headerTitle: {
                            text: value.store_name.toUpperCase()
                        },
                        locationKm: {
                            text: value.distance_in_km
                        },
                        subTitle: {
                            text: "EBO" == value.merchant_type ? "EXCLUSIVE" : ""
                        },
                        address: {
                            text: (value.store_address || "").capitalize()
                        },
                        getDirection: {
                            latitude: value.latitude,
                            longitude: value.longitude
                        }
                    });
                    fabricListLocationData.push(Map.createAnnotation({
                        latitude: value.latitude,
                        longitude: value.longitude,
                        title: value.store_name,
                        subtitle: value.store_address,
                        image: "EBO" == value.merchant_type ? "/images/ebo_pin.png" : "/images/mbo_pin.png",
                        myid: k,
                        rightView: Titanium.UI.createImageView({
                            image: "/images/arrowIcon.png",
                            height: 25,
                            width: 40
                        }),
                        height: 100,
                        width: 50,
                        borderColor: "red",
                        overflow: "hidden"
                    }));
                }
            }
        });
        emptyFabricList && fabricListData.push({
            properties: {},
            template: "emptyTemplate1",
            message: {
                text: "There is no store available for your location"
            }
        });
        $.listSection1.appendItems(fabricListData);
        createMapAnnotations();
        $.map_container.add(mapview);
    }
    function createMapAnnotations() {
        var concatenatedMapLocations = fabricListLocationData.concat(blindListLocationData);
        mapview = Map.createView({
            mapType: Map.NORMAL_TYPE,
            showsTraffic: true,
            showsCompass: true,
            showsBuildings: true,
            region: {
                latitude: coord.latitude,
                longitude: coord.longitude,
                latitudeDelta: .01,
                longitudeDelta: .01
            },
            animate: true,
            regionFit: true,
            annotations: concatenatedMapLocations
        });
        mapview.addEventListener("click", function(e) {
            !isNullVal(e);
            "pin" != e.clicksource && Ti.Platform.openURL("http://maps.google.com/?q=" + e.annotation.latitude + "," + e.annotation.longitude);
            openUrlDirection = "http://maps.google.com/?q=" + e.annotation.latitude + "," + e.annotation.longitude;
        });
    }
    function setStoreListBlind(response) {
        var storeList = response;
        var blindListData = [];
        blindListLocationData = [];
        var emptyBlindList = true;
        $.listSection2.setItems(blindListData);
        _.each(storeList, function(value, k) {
            if (!isNaN(value.latitude) && !isNaN(value.longitude) && "BLIND" == value.store_type) {
                emptyBlindList = false;
                blindListData.push({
                    properties: {
                        latitude: value.latitude,
                        title: value.store_name,
                        subtitle: value.store_address,
                        longitude: value.longitude
                    },
                    headerTitle: {
                        text: value.store_name.toUpperCase()
                    },
                    locationKm: {
                        text: value.distance_in_km
                    },
                    subTitle: {
                        text: "EBO" == value.merchant_type ? "EXCLUSIVE" : ""
                    },
                    address: {
                        text: (value.store_address || "").capitalize()
                    },
                    getDirection: {
                        latitude: value.latitude,
                        longitude: value.longitude
                    }
                });
                blindListLocationData.push(Map.createAnnotation({
                    latitude: value.latitude,
                    longitude: value.longitude,
                    title: value.store_name,
                    subtitle: value.store_address,
                    image: "EBO" == value.merchant_type ? "/images/ebo_pin.png" : "/images/mbo_pin.png",
                    myid: k
                }));
            }
        });
        emptyBlindList && blindListData.push({
            properties: {},
            template: "emptyTemplate",
            message: {
                text: "There is no store available for your location"
            }
        });
        $.listSection2.appendItems(blindListData);
        createMapAnnotations();
        $.map_container.add(mapview);
    }
    function setBeddingList(response) {
        Ti.API.info("**********into bedding list function");
        var storeList = response;
        var beddingListData = [];
        beddingListLocationData = [];
        var emptyBlindList = true;
        $.listSection3.setItems(beddingListData);
        _.each(storeList, function(value, k) {
            if ("BEDDING" == value.store_type) {
                emptyBlindList = false;
                beddingListData.push({
                    properties: {
                        latitude: value.latitude,
                        title: value.store_name,
                        subtitle: value.store_address,
                        longitude: value.longitude
                    },
                    headerTitle: {
                        text: value.store_name.toUpperCase()
                    },
                    locationKm: {
                        text: value.distance_in_km
                    },
                    subTitle: {
                        text: "EBO" == value.merchant_type ? "EXCLUSIVE" : ""
                    },
                    address: {
                        text: (value.store_address || "").capitalize()
                    },
                    getDirection: {
                        latitude: value.latitude,
                        longitude: value.longitude
                    }
                });
                beddingListLocationData.push(Map.createAnnotation({
                    latitude: value.latitude,
                    longitude: value.longitude,
                    title: value.store_name,
                    subtitle: value.store_address,
                    image: "EBO" == args.merchant_type ? "/images/ebo_pin.png" : "/images/mbo_pin.png",
                    rightButton: "images/arrowIcon.png",
                    myid: k
                }));
            }
        });
        emptyBlindList && beddingListData.push({
            properties: {},
            template: "emptyTemplate",
            message: {
                text: "There is no store available for your location"
            }
        });
        $.listSection3.appendItems(beddingListData);
        createMapAnnotations();
        $.map_container.add(mapview);
    }
    function searchStore(e) {
        if (mapViewVisible) {
            $.map_container.visible = false;
            $.goToPop.visible = false;
            $.ListPagePop.visible = false;
            $.findStoreMailView.visible = true;
            mapViewVisible = false;
            $.searchField.visible = true;
            $.screenLbl.visible = false;
            $.searchField.focus();
        } else {
            var state_array = "Andhra Pradesh|Arunachal Pradesh|Assam|Bihar|Chhattisgarh|Goa|Gujarat|Haryana|Himachal Pradesh|Jammu and Kashmir|Jharkhand|Karnataka|Kerala|Madhya Pradesh|Maharashtra|Manipur|Meghalaya|Mizoram|Nagaland|Odisha(Orissa)|Punjab|Rajasthan|Sikkim|Tamil Nadu|Tripura|Uttar Pradesh|Uttarakhand|West Bengal|Bhandup|Mumbai|Visakhapatnam|Coimbatore|Delhi|Bangalore|Pune|Nagpur|Lucknow|Vadodara|Indore|Jalalpur|Bhopal|Kolkata|Kanpur|New Delhi|Faridabad|Rajkot|Ghaziabad|Chennai|Meerut|Agra|Jaipur|Jabalpur|Varanasi|Allahabad|Hyderabad|Noida|Howrah|Thane|Patiala|Chakan|Ahmedabad|Manipala|Mangalore|Panvel|Udupi|Rishikesh|Gurgaon|Mathura|Shahjahanpur|Bagpat|Sriperumbudur|Chandigarh|Ludhiana|Palakkad|Kalyan|Valsad|Ulhasnagar|Bhiwani|Shimla|Dehradun|Patna|Unnao|Tiruvallur|Kanchipuram|Jamshedpur|Gwalior|Karur|Erode|Gorakhpur|Ooty|Haldwani|Bikaner|Puducherry|Nalbari|Bellary|Vellore|Naraina|Mandi|Rupnagar|Jodhpur|Roorkee|Aligarh|Indraprast|Karnal|Tanda|Amritsar|Raipur|Pilani|Bilaspur|Srinagar|Guntur|Kakinada|Warangal|Tirumala - Tirupati|Nizamabad|Kadapa|Kuppam|Anantpur|Nalgonda|Potti|Nellore|Rajahmundry|Bagalkot|Kurnool|Secunderabad|Mahatma|Bharuch|Miraj|Nanded|Anand|Gandhinagar|Bhavnagar|Morvi|Aurangabad|Modasa|Patan|Solapur|Kolhapur|Junagadh|Akola|Bhuj|Karad|Jalgaon Jamod|Chandrapur|Maharaj|Dhule|Ponda|Dahod|Navsari|Panjim|Patel|Nashik|Amravati|Somnath|Ganpat|Karwar|Davangere|Raichur|Nagara|Kushalnagar|Hassan|Hubli|Bidar|Belgaum|Mysore|Dharwad|Kolar|TumkÅ«r|Tiruchi|Thiruvananthapuram|Kozhikode|Thrissur|Madurai|Thalassery|Kannur|Karaikudi|Thanjavur|Manor|Idukki|Thiruvarur|Alappuzha|Gandhigram|Kochi|Annamalainagar|Amet|Kottarakara|Kottayam|Tirunelveli|Mohan|Salem|Attingal|Chitra|Chengannur|Guwahati|Kalam|Ranchi|Shillong|Gangtok|Srikakulam|Tezpur|Bhubaneswar|Imphal|Sundargarh|Arunachal|Manipur|Bihar Sharif|Mandal|Dibrugarh|Darbhanga|Gaya|Bhagalpur|Kunwar|Barddhaman|Jadabpur|Kalyani|Cuttack|Barpeta|Jorhat|Kharagpur|Medinipur|Agartala|Saranga|Machilipatnam|Dhanbad|Silchar|Dumka|Kokrajhar|Bankura|Jalpaiguri|Durgapur|Kalinga|Palampur|Jammu|Dwarka|Faridkot|Udaipur|Raigarh|Hisar|Solan|Ajmer|Lala|Gurdaspur|Sultanpur|Jhansi|Vidisha|Jagdalpur|Dipas|Sawi|Etawah|Saharanpur|Ujjain|Kangra|Bhilai|Rohtak|Haryana|Ambala|Bareilly|Bhoj|Kapurthala Town|Sangrur|Pusa|Sagar|Rewa|Bhawan|Rampur|Bhadohi|Cuddalore|Khopoli|Bali|Bhiwandi|Vasai|Badlapur|Sambalpur|Raurkela|Brahmapur|Visnagar|Surendranagar|Ankleshwar|Dahanu|Silvassa|Jamnagar|Dhansura|Muzaffarpur|Wardha|Bodhan|Parappanangadi|Malappuram|Vizianagaram|Mavelikara|Pathanamthitta|Satara|Janjgir|Gold|Himatnagar|Bodinayakkanur|Gandhidham|Mahabalipuram|Nadiad|Virar|Bahadurgarh|Kaithal|Siliguri|Tiruppur|Ernakulam|Jalandhar|Barakpur|Kavaratti|Ratnagiri|Moga|Hansi|Sonipat|Bandra|Aizawl|Itanagar|Nagar|Ghatkopar|Chen|Powai|Bhimavaram|Bhongir|Medak|Karimnagar|Narsapur|Vijayawada|Markapur|Mancherial|Sangli|Moradabad|Alipur|Ichalkaranji|Devgarh|Yavatmal|Hinganghat|Madgaon|Verna|Katra|Bilaspur|Uttarkashi|Muktsar|Bhatinda|Pathankot|Khatauli|Vikasnagar|Kollam|Kovilpatti|Kovvur|Paloncha|Vasco|Alwar|Bijapur|Tinsukia|Ratlam|Kalka|Ladwa|Rajpura|Batala|Hoshiarpur|Katni|Bhilwara|Jhajjar|Lohaghat|Mohali|Dhuri|Thoothukudi|Sivakasi|Coonoor|Shimoga|Kayamkulam|Namakkal|Dharmapuri|Aluva|Antapur|Tanuku|Eluru|Balasore|Hingoli|Quepem|Assagao|Betim|Cuncolim|Ahmednagar|Goa|Caranzalem|Chopda|Petlad|Raipur|Villupuram|Shoranur|Dasua|Gonda|Yadgir|Palladam|Nuzvid|Kasaragod|Paonta Sahib|Sarangi|Anantapur|Kumar|Kaul|Panipat|Uppal|Teri|Tiruvalla|Jamal|Chakra|Narasaraopet|Dharamsala|Ranjan|Garhshankar|Haridwar|Chinchvad|Narela|Aurangabad|Sion|Kalamboli|Chittoor|Wellington|Nagapattinam|Karaikal|Pollachi|Thenkasi|Aranmula|Koni|Ariyalur|Ranippettai|Kundan|Lamba Harisingh|Surana|Ghana|Lanka|Kataria|Kotian|Khan|Salt Lake City|Bala|Vazhakulam|Paravur|Nabha|Ongole|Kaladi|Jajpur|Thenali|Mohala|Mylapore|Bank|Khammam|Ring|Maldah|Kavali|Andheri|Baddi|Mahesana|Nila|Gannavaram|Cumbum|Belapur|Phagwara|Rander|Siuri|Bulandshahr|Bilimora|Guindy|Pitampura|Baharampur|Dadri|Boisar|Shiv|Multi|Bhadath|Ulubari|Palghar|Puras|Sikka|Saha|Godhra|Dam Dam|Ekkattuthangal|Sahibabad|Kalol|Bardoli|Wai|Shirgaon|Nehra|Mangalagiri|Latur|Kottakkal|Rewari|Ponnani|Narayangaon|Hapur|Kalpetta|Khurja|Ramnagar|Neral|Sendhwa|Talegaon Dabhade|Kargil|Manali|Jalalabad|Palani|Sirkazhi|Krishnagiri|Hiriyur|Muzaffarnagar|Kashipur|Gampalagudem|Siruseri|Manjeri|Raniganj|Mahim|Bhusawal|Tirur|Sattur|Angul|Puri|Khurda|Dharavi|Ambur|Vashi|Arch|Colaba|Hosur|Kota|Hugli|Anantnag|Murshidabad|Jharsuguda|Jind|Neyveli|Vaniyambadi|Srikalahasti|Liluah|Pali|Bokaro|Sidhi|Asansol|Darjeeling|Kohima|Shahdara|Chandannagar|Nadgaon|Haripad|Sitapur|Vapi|Bambolim|Baidyabati|Connaught Place|Singtam|Shyamnagar|Sikar|Choolai|Mayapur|Puruliya|Habra|Kanchrapara|Goregaon|Tiptur|Kalpakkam|Serampore|Konnagar|Port Blair|Canning|Mahad|Alibag|Pimpri|Panchgani|Karjat|Vaikam|Mhow|Lakhimpur|Madhoganj|Kheri|Gudivada|Avanigadda|Nayagarh|Bemetara|Bhatapara|Ramgarh|Dhubri|Goshaingaon|Bellare|Puttur|Narnaul|Porbandar|Keshod|Dhrol|Kailaras|Morena|Deolali|Banda|Orai|Fatehpur|Mirzapur|Adilabad|Pithapuram|Ramavaram|Amalapuram|Champa|Ambikapur|Korba|Pehowa|Yamunanagar|Shahabad|Hamirpur|Gulbarga|Sagar|Bhadravati|Sirsi|Honavar|Siruguppa|Koppal|Gargoti|Kankauli|Jalna|Parbhani|Koraput|Barpali|Jaypur|Banswara|Tindivanam|Mettur|Srirangam|Deoria|Basti|Padrauna|Budaun|Bolpur|Gujrat|Balurghat|Binnaguri|Guruvayur|Chandauli|Madikeri|Piduguralla|Vinukonda|Berasia|Sultans Battery|Ramanagaram|Angadipuram|Mattanur|Gobichettipalayam|Banga|Sibsagar|Namrup|North Lakhimpur|Dhenkanal|Karanja|Cheyyar|Vandavasi|Arakkonam|Tiruvannamalai|Akividu|Tadepallegudem|Madanapalle|Puttur|Edavanna|Kodungallur|Marmagao|Sanquelim|Sakri|Shahdol|Satna|Thasra|Bundi|Kishangarh|Firozpur|Kot Isa Khan|Barnala|Sunam|Pithoragarh|Jaspur|Jhargram|Dimapur|Churachandpur|Raxaul|Motihari|Munger|Purnea|Mannargudi|Kumbakonam|Eral|Nagercoil|Kanniyakumari|Ramanathapuram|Sivaganga|Rajapalaiyam|Srivilliputhur|Suratgarh|Gohana|Sirsa|Fatehabad|Nurpur|Chamba|Khergam|Dindigul|Pudukkottai|Kaimganj|Tarn Taran|Khanna|Irinjalakuda|Sehore|Parra|Dicholi|Chicalim|Saligao|Changanacheri|Igatpuri|Sangamner|Ganganagar|Kanhangad|Chidambaram|Chittur|Nilambur|Arvi|Jalesar|Kasganj|Chandausi|Beawar|Bharatpur|Kathua|Chalisgaon|Karamsad|Peranampattu|Arani|Payyanur|Pattambi|Pattukkottai|Pakala|Vikarabad|Bhatkal|Rupnarayanpur|Kulti|Koch Bihar|Nongstoin|Budbud|Balangir|Kharar|Mukerian|Mansa|Punalur|Mandya|Nandyal|Dhone|Candolim|Aldona|Solim|Daman|Koothanallur|Sojat|Alanallur|Kagal|Jhunjhunun|Sirhind|Kurali|Khinwara|Machhiwara|Talwandi Sabo|Malpur|Dhar|Medarametla|Pileru|Yercaud|Ottappalam|Alangulam|Palus|Chiplun|Durg|Damoh|Ambarnath|Haveri|Mundgod|Mandvi|Behala|Fort|Bela|Balana|Odhan|Mawana|Firozabad|Bichpuri|Almora|Pauri|Azamgarh|Phaphamau|Nongpoh|Gangrar|Jhalawar|Nathdwara|Jaisalmer|Pushkar|Sirohi|Baroda|Ambah|Ambejogai|Ambad|Osmanabad|Betalbatim|Gangapur|Dindori|Yeola|Pandharpur|Neri|Umred|Patelguda|Patancheru|Singarayakonda|Peddapuram|Gadag|ChikmagalÅ«r|Chikodi|Amer|Chintamani|Tambaram|Palayam|Karamadai|Omalur|Kuzhithurai|Faizabad|Thirumangalam|Kodaikanal|Devipattinam|Dharapuram|Rudrapur|Talcher|Haldia|Karsiyang|Sandur|Bapatla|Shamsabad|Kandi|Ramapuram|Anchal|Trimbak|Calangute|Arpora|Khargone|Mandla|Kalan|Pachmarhi|Dhamtari|Kumhari|Aundh|Tala|Tuljapur|Botad|Sidhpur|Sanand|Nagwa|Mussoorie|Vadamadurai|Sholavandan|Pochampalli|Perundurai|Lalgudi|Ponneri|Mount Abu|Vadner|Shanti Grama|Nalagarh|Pahalgam|Dinanagar|Jatani|Ganga|Barmer|Hoshangabad|Khajuraho Group of Monuments|Betul|Sangola|Tirumala|Mirza Murad|Attur|Budha|Pala|Tonk|Koni|Rajpur|Shrigonda|Hazaribagh|Nagaur|Mandapeta|Nabadwip|Nandurbar|Nazira|Kasia|Bargarh|Kollegal|Shahkot|Jagraon|Channapatna|Madurantakam|Kamalpur|Ranaghat|Mundra|Mashobra|Rama|Chirala|Bawana|Dhaka|Mahal|Chitradurga|Mandsaur|Dewas|Sachin|Andra|Kalkaji Devi|Pilkhuwa|Mehra|Chhachhrauli|Samastipur|Bangaon|Ghatal|Jayanti|Belgharia|Kamat|Dhariwal|Morinda|Kottagudem|Suriapet|Mahesh|Sirwani|Kanakpura|Mahajan|Sodhi|Chand|Nagal|Hong|Raju|Tikamgarh|Parel|Jaynagar|Mill|Khambhat|Ballabgarh|Begusarai|Shahapur|Banka|Golaghat|Palwal|Kalra|Chandan|Maru|Nanda|Chopra|Kasal|Rana|Chetan|Charu|Arora|Chhabra|Bishnupur|Manu|Karimganj|Ellora Caves|Adwani|Amreli|Soni|Sarwar|Balu|Rawal|Darsi|Nandigama|Mathan|Panchal|Jha Jha|Hira|Manna|Amal|Kheda|Abdul|Roshan|Bhandari|Binavas|Hari|Nandi|Rajapur|Suman|Sakri|Khalapur|Dangi|Thiruthani|Bawan|Basu|Kosamba|Medchal|Kakdwip|Kamalpura|Dogadda|Charan|Basirhat|Nagari|Kangayam|Sopara|Nadia|Mahulia|Alipur|Hamirpur|Fatehgarh|Bagh|Naini|Karari|Ajabpur|Jaunpur|Iglas|Pantnagar|Dwarahat|Dasna|Mithapur|Bali|Nilokheri|Kolayat|Haripur|Dang|Chhota Udepur|Matar|Sukma|Guna|Dona Paula|Navelim|Vainguinim|Curchorem|Balaghat|Bhagwan|Vijapur|Sinnar|Mangaon|Hadadi|Bobbili|Yanam|Udaigiri|Balanagar|Kanigiri|Muddanuru|Panruti|Proddatur|Puliyur|Perambalur|Turaiyur|Tiruchchendur|Shadnagar|Markal|Sultan|Rayagada|Kaniyambadi|Vandalur|Sangam|Katoya|Gudur|Farakka|Baramati|Tohana";
            state_array = state_array.split("|");
            var newState_array = state_array.filter(function(item, pos) {
                return state_array.indexOf(item) == pos;
            });
            if (e.value.length > 2) {
                var searchListData = [];
                $.searchStoreListSection.setItems(searchListData);
                searchString = firstToUpperCase(e.value);
                var matches = _.filter(newState_array, function(s) {
                    return -1 !== s.indexOf(searchString);
                });
                _.each(matches, function(value, k) {
                    searchListData.push({
                        properties: {
                            word: value
                        },
                        searchListItemBindID: {
                            text: value
                        }
                    });
                });
                $.searchStoreMainViewContainer.visible = true;
                $.searchStoreListSection.appendItems(searchListData);
            } else {
                var searchListData = [];
                $.searchStoreListSection.setItems(searchListData);
                $.searchStoreMainViewContainer.visible = false;
            }
        }
    }
    function firstToUpperCase(str) {
        return str.substr(0, 1).toUpperCase() + str.substr(1);
    }
    function getLocationFromString(e) {
        var a = e.section.items[e.itemIndex];
        $.searchField.blur();
        $.searchField.value = a.properties.word;
        showLoader($.findStore);
        fetchGeolocation(a.properties.word);
    }
    function getLatLan(e) {
        $.searchStoreMainViewContainer.visible = false;
        var currentLatitude = "" + e.latitude;
        var currentLongitude = "" + e.longitude;
        var param = {
            latitude: currentLatitude,
            longitude: currentLongitude,
            filter: "All",
            storetype: "All"
        };
        var requestMethod = Alloy.Globals.commonUrl.storeList;
        var requestParams = JSON.stringify(param);
        Alloy.Globals.webServiceCall(requestMethod, requestParams, _getStoreListSuccessCallback, _getStoreListErrorCallback, "POST", $.findStore);
    }
    function geolocation() {
        Ti.Geolocation.requestLocationPermissions(Ti.Geolocation.AUTHORIZATION_ALWAYS, function(e) {
            e.success ? Ti.Media.requestCameraPermissions(function(e) {
                e.success && getLocation();
            }) : Ti.Media.requestCameraPermissions();
        });
        Ti.Media.requestCameraPermissions(function(e) {
            e.success && getLocation();
        });
    }
    function tempCall(value) {
        Ti.API.info("we are here " + value);
        var searchString = firstToUpperCase(value);
        fetchGeolocation(searchString);
        $.searchField.value = value;
        $.searchStoreMainViewContainer.visible = false;
        $.searchField.blur();
        showLoader($.findStore);
    }
    function clearMemory() {
        storeLocatorResponseData = null;
        $.removeListener();
        $.findStore.remove($.header);
        $.findStore.remove($.map_container);
        $.findStore.remove($.findStoreMailView);
        $.findStore.remove($.searchStoreMainViewContainer);
        $.findStore.remove($.ListPagePop);
        $.findStore.remove($.goToPop);
        $.header.removeAllChildren();
        $.map_container.removeAllChildren();
        $.findStoreMailView.removeAllChildren();
        $.searchStoreMainViewContainer.removeAllChildren();
        $.ListPagePop.removeAllChildren();
        $.goToPop.removeAllChildren();
        $.destroy();
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "findStore";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.findStore = Ti.UI.createWindow({
        orientationModes: [ Ti.UI.PORTRAIT ],
        windowSoftInputMode: Titanium.UI.Android.SOFT_INPUT_STATE_HIDDEN,
        backgroundColor: "#231f20",
        id: "findStore"
    });
    $.__views.findStore && $.addTopLevelView($.__views.findStore);
    goToBack ? $.addListener($.__views.findStore, "android:back", goToBack) : __defers["$.__views.findStore!android:back!goToBack"] = true;
    clearMemory ? $.addListener($.__views.findStore, "close", clearMemory) : __defers["$.__views.findStore!close!clearMemory"] = true;
    $.__views.header = Ti.UI.createView({
        height: "55dp",
        width: Titanium.UI.FILL,
        top: "0",
        left: "0",
        backgroundColor: "#231f20",
        id: "header"
    });
    $.__views.findStore.add($.__views.header);
    $.__views.screenLbl = Ti.UI.createLabel({
        font: {
            fontSize: "16dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        left: "5%",
        color: "#fff",
        text: "FIND A STORE",
        visible: true,
        id: "screenLbl"
    });
    $.__views.header.add($.__views.screenLbl);
    $.__views.searchField = Ti.UI.createTextField({
        font: {
            fontFamily: "futura_lt_bt_light-webfont",
            fontSize: "14dp"
        },
        color: "#ffff",
        left: "5%",
        width: Titanium.UI.FILL,
        right: "20%",
        returnKeyType: Titanium.UI.RETURNKEY_SEARCH,
        id: "searchField",
        visible: false,
        type: "textField",
        hintText: "Enter City/ State/ Pincode"
    });
    $.__views.header.add($.__views.searchField);
    $.__views.searchStore = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "20dp"
        },
        height: "45dp",
        width: "45dp",
        color: "#fff",
        text: Alloy.Globals.icon.search,
        right: "14%",
        id: "searchStore"
    });
    $.__views.header.add($.__views.searchStore);
    enableSearch ? $.addListener($.__views.searchStore, "click", enableSearch) : __defers["$.__views.searchStore!click!enableSearch"] = true;
    $.__views.closeStore = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "20dp"
        },
        height: "45dp",
        width: "45dp",
        color: "#fff",
        text: Alloy.Globals.icon.close,
        right: "5%",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        id: "closeStore"
    });
    $.__views.header.add($.__views.closeStore);
    $.__views.map_container = Ti.UI.createView({
        visible: "false",
        top: "53dp",
        height: Titanium.UI.SIZE,
        width: Titanium.UI.FILL,
        id: "map_container"
    });
    $.__views.findStore.add($.__views.map_container);
    $.__views.findStoreMailView = Ti.UI.createView({
        top: "53dp",
        layout: "vertical",
        height: Titanium.UI.SIZE,
        width: Titanium.UI.FILL,
        backgroundColor: "#231f20",
        id: "findStoreMailView"
    });
    $.__views.findStore.add($.__views.findStoreMailView);
    $.__views.filterContainer = Ti.UI.createView({
        backgroundColor: "#231f20",
        width: Titanium.UI.FILL,
        height: "40dp",
        scrollType: "horizontal",
        layout: "horizontal",
        id: "filterContainer"
    });
    $.__views.findStoreMailView.add($.__views.filterContainer);
    $.__views.shopingBagLbl = Ti.UI.createLabel({
        left: "0dp",
        font: {
            fontSize: "10sp"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        height: Titanium.UI.FILL,
        width: "32%",
        text: "FABRIC",
        id: "shopingBagLbl"
    });
    $.__views.filterContainer.add($.__views.shopingBagLbl);
    $.__views.__alloyId649 = Ti.UI.createLabel({
        font: {
            fontSize: "12sp"
        },
        color: "#a6ffffff",
        text: "|",
        id: "__alloyId649"
    });
    $.__views.filterContainer.add($.__views.__alloyId649);
    $.__views.reviewLbl = Ti.UI.createLabel({
        font: {
            fontSize: "10sp"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        height: Titanium.UI.FILL,
        width: "32%",
        text: "BLINDS",
        id: "reviewLbl"
    });
    $.__views.filterContainer.add($.__views.reviewLbl);
    $.__views.__alloyId650 = Ti.UI.createLabel({
        font: {
            fontSize: "12sp"
        },
        color: "#a6ffffff",
        text: "|",
        id: "__alloyId650"
    });
    $.__views.filterContainer.add($.__views.__alloyId650);
    $.__views.beddingLbl = Ti.UI.createLabel({
        right: "0dp",
        font: {
            fontSize: "10sp"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        height: Titanium.UI.FILL,
        width: "32%",
        text: "BEDDING",
        id: "beddingLbl"
    });
    $.__views.filterContainer.add($.__views.beddingLbl);
    $.__views.vwToAnimate = Ti.UI.createView({
        width: "32%",
        height: "2dp",
        left: "0dp",
        backgroundColor: "#e65e48",
        id: "vwToAnimate"
    });
    $.__views.findStoreMailView.add($.__views.vwToAnimate);
    var __alloyId651 = [];
    $.__views.fabricStoreView = Ti.UI.createView({
        id: "fabricStoreView"
    });
    __alloyId651.push($.__views.fabricStoreView);
    $.__views.fabricFilterMainView = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: "35dp",
        top: "5dp",
        zIndex: "100",
        type: "outerView",
        id: "fabricFilterMainView"
    });
    $.__views.fabricStoreView.add($.__views.fabricFilterMainView);
    $.__views.styleDropDown = Ti.UI.createView({
        layout: "vertical",
        width: "150dp",
        right: "5dp",
        height: "35dp",
        top: "5dp",
        zIndex: "100",
        id: "styleDropDown"
    });
    $.__views.fabricFilterMainView.add($.__views.styleDropDown);
    $.__views.__alloyId652 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        top: "0dp",
        layout: "horizontal",
        touchEnabled: false,
        id: "__alloyId652"
    });
    $.__views.styleDropDown.add($.__views.__alloyId652);
    $.__views.styleNameLbl = Ti.UI.createLabel({
        left: "10dp",
        right: "1dp",
        top: "0dp",
        width: Titanium.UI.SIZE,
        height: "35dp",
        font: {
            fontSize: "10dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        color: "#fff",
        touchEnabled: false,
        text: "ALL",
        id: "styleNameLbl"
    });
    $.__views.__alloyId652.add($.__views.styleNameLbl);
    $.__views.styleDropDownIcon = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "7dp"
        },
        width: "30dp",
        height: "30dp",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        color: "#e65e48",
        touchEnabled: false,
        text: Alloy.Globals.icon.dropdownArrow,
        id: "styleDropDownIcon"
    });
    $.__views.__alloyId652.add($.__views.styleDropDownIcon);
    $.__views.sc1 = Ti.UI.createScrollView({
        layout: "vertical",
        backgroundColor: "#fff",
        id: "sc1",
        height: 0
    });
    $.__views.styleDropDown.add($.__views.sc1);
    var __alloyId653 = {};
    var __alloyId656 = [];
    var __alloyId658 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId659 = [];
            var __alloyId660 = {
                type: "Ti.UI.Label",
                bindId: "headerTitle",
                properties: {
                    font: {
                        fontFamily: "futura-hv-bt-heavy",
                        fontSize: "12dp"
                    },
                    left: "20dp",
                    top: "0",
                    color: "#fff",
                    height: "12dp",
                    wordWrap: true,
                    bindId: "headerTitle"
                }
            };
            __alloyId659.push(__alloyId660);
            var __alloyId661 = {
                type: "Ti.UI.Label",
                bindId: "locationKm",
                properties: {
                    font: {
                        fontFamily: "futura_medium_bt-webfont",
                        fontSize: "12dp"
                    },
                    color: "#a0a0a0",
                    top: "0",
                    right: "20dp",
                    bindId: "locationKm"
                }
            };
            __alloyId659.push(__alloyId661);
            return __alloyId659;
        }(),
        properties: {
            width: Titanium.UI.FILL,
            height: Titanium.UI.SIZE,
            top: "5dp",
            left: 0
        }
    };
    __alloyId656.push(__alloyId658);
    var __alloyId662 = {
        type: "Ti.UI.Label",
        bindId: "subTitle",
        properties: {
            font: {
                fontFamily: "futura_medium_bt-webfont",
                fontSize: "10dp"
            },
            color: "#fff",
            top: "5dp",
            left: "20dp",
            bindId: "subTitle"
        }
    };
    __alloyId656.push(__alloyId662);
    var __alloyId663 = {
        type: "Ti.UI.Label",
        bindId: "address",
        properties: {
            left: "20dp",
            color: "#a0a0a0",
            width: "70%",
            height: Titanium.UI.SIZE,
            maxLines: 4,
            wordWrap: true,
            font: {
                fontSize: "10dp"
            },
            bindId: "address"
        }
    };
    __alloyId656.push(__alloyId663);
    var __alloyId664 = {
        type: "Ti.UI.Label",
        bindId: "getDirection",
        properties: {
            color: Alloy.Globals.labelTitleColor,
            top: "5dp",
            left: "20dp",
            bottom: "15dp",
            font: {
                fontSize: "12dp"
            },
            text: "GET DIRECTIONS",
            bindId: "getDirection"
        }
    };
    __alloyId656.push(__alloyId664);
    var __alloyId655 = {
        properties: {
            height: Ti.UI.SIZE,
            backgroundColor: "transparent",
            width: Ti.UI.FILL,
            layout: "vertical",
            name: "fabricTemplate",
            selectionStyle: "none"
        },
        childTemplates: __alloyId656
    };
    __alloyId653["fabricTemplate"] = __alloyId655;
    var __alloyId667 = [];
    var __alloyId669 = {
        type: "Ti.UI.Label",
        bindId: "message",
        properties: {
            font: {
                fontSize: "11dp",
                fontFamily: "futura_medium_bt-webfont"
            },
            height: "15dp",
            textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
            color: "#fff",
            text: "THERE ARE NO COLLECTIONS IN THIS CATEGORY.",
            bindId: "message"
        }
    };
    __alloyId667.push(__alloyId669);
    var __alloyId666 = {
        properties: {
            backgroundColor: "#231f20",
            name: "emptyTemplate1",
            bindId: "templateView1"
        },
        childTemplates: __alloyId667
    };
    __alloyId653["emptyTemplate1"] = __alloyId666;
    $.__views.listSection1 = Ti.UI.createListSection({
        id: "listSection1"
    });
    var __alloyId671 = [];
    __alloyId671.push($.__views.listSection1);
    $.__views.fabricListContainer = Ti.UI.createListView({
        width: Titanium.UI.FILL,
        top: "40dp",
        left: "5dp",
        right: "5dp",
        scrollType: "vertical",
        sections: __alloyId671,
        templates: __alloyId653,
        id: "fabricListContainer",
        defaultItemTemplate: "fabricTemplate",
        bottom: "5dp"
    });
    $.__views.fabricStoreView.add($.__views.fabricListContainer);
    $.__views.blindStoreView = Ti.UI.createView({
        id: "blindStoreView"
    });
    __alloyId651.push($.__views.blindStoreView);
    $.__views.blindsFilterMainView = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: "35dp",
        top: "5dp",
        zIndex: "100",
        type: "outerView",
        id: "blindsFilterMainView"
    });
    $.__views.blindStoreView.add($.__views.blindsFilterMainView);
    $.__views.styleDropDown1 = Ti.UI.createView({
        layout: "vertical",
        width: "150dp",
        right: "5dp",
        height: "35dp",
        top: "5dp",
        zIndex: "100",
        id: "styleDropDown1"
    });
    $.__views.blindsFilterMainView.add($.__views.styleDropDown1);
    $.__views.__alloyId672 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        top: "0dp",
        layout: "horizontal",
        touchEnabled: false,
        id: "__alloyId672"
    });
    $.__views.styleDropDown1.add($.__views.__alloyId672);
    $.__views.styleNameLbl1 = Ti.UI.createLabel({
        left: "10dp",
        right: "1dp",
        top: "0dp",
        width: Titanium.UI.SIZE,
        height: "35dp",
        font: {
            fontSize: "10dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        color: "#fff",
        touchEnabled: false,
        text: "ALL",
        id: "styleNameLbl1"
    });
    $.__views.__alloyId672.add($.__views.styleNameLbl1);
    $.__views.styleDropDownIcon1 = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "7dp"
        },
        width: "30dp",
        height: "30dp",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        color: "#e65e48",
        touchEnabled: false,
        text: Alloy.Globals.icon.dropdownArrow,
        id: "styleDropDownIcon1"
    });
    $.__views.__alloyId672.add($.__views.styleDropDownIcon1);
    $.__views.styleScroll = Ti.UI.createScrollView({
        layout: "vertical",
        backgroundColor: "#fff",
        id: "styleScroll",
        height: 0
    });
    $.__views.styleDropDown1.add($.__views.styleScroll);
    var __alloyId673 = {};
    var __alloyId676 = [];
    var __alloyId678 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId679 = [];
            var __alloyId680 = {
                type: "Ti.UI.Label",
                bindId: "headerTitle",
                properties: {
                    font: {
                        fontFamily: "futura-hv-bt-heavy",
                        fontSize: "12dp"
                    },
                    left: "20dp",
                    top: "0",
                    color: "#fff",
                    height: "12dp",
                    wordWrap: true,
                    bindId: "headerTitle"
                }
            };
            __alloyId679.push(__alloyId680);
            var __alloyId681 = {
                type: "Ti.UI.Label",
                bindId: "locationKm",
                properties: {
                    font: {
                        fontFamily: "futura_medium_bt-webfont",
                        fontSize: "12dp"
                    },
                    color: "#a0a0a0",
                    top: "0",
                    right: "20dp",
                    bindId: "locationKm"
                }
            };
            __alloyId679.push(__alloyId681);
            return __alloyId679;
        }(),
        properties: {
            width: Titanium.UI.FILL,
            height: Titanium.UI.SIZE,
            top: "5dp",
            left: 0
        }
    };
    __alloyId676.push(__alloyId678);
    var __alloyId682 = {
        type: "Ti.UI.Label",
        bindId: "subTitle",
        properties: {
            font: {
                fontFamily: "futura_medium_bt-webfont",
                fontSize: "10dp"
            },
            color: "#fff",
            top: "5dp",
            left: "20dp",
            bindId: "subTitle"
        }
    };
    __alloyId676.push(__alloyId682);
    var __alloyId683 = {
        type: "Ti.UI.Label",
        bindId: "address",
        properties: {
            left: "20dp",
            color: "#a0a0a0",
            width: "70%",
            height: Titanium.UI.SIZE,
            maxLines: 4,
            wordWrap: true,
            font: {
                fontSize: "10dp"
            },
            bindId: "address"
        }
    };
    __alloyId676.push(__alloyId683);
    var __alloyId684 = {
        type: "Ti.UI.Label",
        bindId: "getDirection",
        properties: {
            color: Alloy.Globals.labelTitleColor,
            top: "5dp",
            left: "20dp",
            bottom: "15dp",
            font: {
                fontSize: "12dp"
            },
            text: "GET DIRECTIONS",
            bindId: "getDirection"
        }
    };
    __alloyId676.push(__alloyId684);
    var __alloyId675 = {
        properties: {
            height: Ti.UI.SIZE,
            backgroundColor: "transparent",
            width: Ti.UI.FILL,
            layout: "vertical",
            name: "blindsTemplate",
            selectionStyle: "none"
        },
        childTemplates: __alloyId676
    };
    __alloyId673["blindsTemplate"] = __alloyId675;
    var __alloyId687 = [];
    var __alloyId689 = {
        type: "Ti.UI.Label",
        bindId: "message",
        properties: {
            font: {
                fontSize: "11dp",
                fontFamily: "futura_medium_bt-webfont"
            },
            height: "15dp",
            textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
            color: "#fff",
            text: "THERE ARE NO COLLECTIONS IN THIS CATEGORY.",
            bindId: "message"
        }
    };
    __alloyId687.push(__alloyId689);
    var __alloyId686 = {
        properties: {
            backgroundColor: "#231f20",
            name: "emptyTemplate",
            bindId: "templateView"
        },
        childTemplates: __alloyId687
    };
    __alloyId673["emptyTemplate"] = __alloyId686;
    $.__views.listSection2 = Ti.UI.createListSection({
        id: "listSection2"
    });
    var __alloyId691 = [];
    __alloyId691.push($.__views.listSection2);
    $.__views.blindsListContainer = Ti.UI.createListView({
        width: Titanium.UI.FILL,
        top: "40dp",
        left: "5dp",
        right: "5dp",
        scrollType: "vertical",
        sections: __alloyId691,
        templates: __alloyId673,
        id: "blindsListContainer",
        defaultItemTemplate: "blindsTemplate",
        bottom: "5dp"
    });
    $.__views.blindStoreView.add($.__views.blindsListContainer);
    $.__views.BeddingStore = Ti.UI.createView({
        id: "BeddingStore"
    });
    __alloyId651.push($.__views.BeddingStore);
    $.__views.beddingFilterMainView = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: "35dp",
        top: "5dp",
        zIndex: "100",
        type: "outerView",
        id: "beddingFilterMainView"
    });
    $.__views.BeddingStore.add($.__views.beddingFilterMainView);
    $.__views.styleDropDown2 = Ti.UI.createView({
        layout: "vertical",
        width: "150dp",
        right: "5dp",
        height: "35dp",
        top: "5dp",
        zIndex: "100",
        id: "styleDropDown2"
    });
    $.__views.beddingFilterMainView.add($.__views.styleDropDown2);
    $.__views.__alloyId692 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        top: "0dp",
        layout: "horizontal",
        touchEnabled: false,
        id: "__alloyId692"
    });
    $.__views.styleDropDown2.add($.__views.__alloyId692);
    $.__views.styleNameLbl2 = Ti.UI.createLabel({
        left: "10dp",
        right: "1dp",
        top: "0dp",
        width: Titanium.UI.SIZE,
        height: "35dp",
        font: {
            fontSize: "10dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        color: "#ffffff",
        touchEnabled: false,
        text: "ALL",
        id: "styleNameLbl2"
    });
    $.__views.__alloyId692.add($.__views.styleNameLbl2);
    $.__views.styleDropDownIcon2 = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "7dp"
        },
        width: "30dp",
        height: "30dp",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        color: "#e65e48",
        touchEnabled: false,
        text: Alloy.Globals.icon.dropdownArrow,
        id: "styleDropDownIcon2"
    });
    $.__views.__alloyId692.add($.__views.styleDropDownIcon2);
    $.__views.beddingstyleScroll = Ti.UI.createScrollView({
        layout: "vertical",
        backgroundColor: "#fff",
        id: "beddingstyleScroll",
        height: 0
    });
    $.__views.styleDropDown2.add($.__views.beddingstyleScroll);
    var __alloyId693 = {};
    var __alloyId696 = [];
    var __alloyId698 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId699 = [];
            var __alloyId700 = {
                type: "Ti.UI.Label",
                bindId: "headerTitle",
                properties: {
                    font: {
                        fontFamily: "futura-hv-bt-heavy",
                        fontSize: "12dp"
                    },
                    left: "20dp",
                    top: "0",
                    color: "#fff",
                    height: "12dp",
                    wordWrap: true,
                    bindId: "headerTitle"
                }
            };
            __alloyId699.push(__alloyId700);
            var __alloyId701 = {
                type: "Ti.UI.Label",
                bindId: "locationKm",
                properties: {
                    font: {
                        fontFamily: "futura_medium_bt-webfont",
                        fontSize: "12dp"
                    },
                    color: "#a0a0a0",
                    top: "0",
                    right: "20dp",
                    bindId: "locationKm"
                }
            };
            __alloyId699.push(__alloyId701);
            return __alloyId699;
        }(),
        properties: {
            width: Titanium.UI.FILL,
            height: Titanium.UI.SIZE,
            top: "5dp",
            left: 0
        }
    };
    __alloyId696.push(__alloyId698);
    var __alloyId702 = {
        type: "Ti.UI.Label",
        bindId: "subTitle",
        properties: {
            font: {
                fontFamily: "futura_medium_bt-webfont",
                fontSize: "10dp"
            },
            color: "#fff",
            top: "5dp",
            left: "20dp",
            bindId: "subTitle"
        }
    };
    __alloyId696.push(__alloyId702);
    var __alloyId703 = {
        type: "Ti.UI.Label",
        bindId: "address",
        properties: {
            left: "20dp",
            color: "#a0a0a0",
            width: "70%",
            height: Titanium.UI.SIZE,
            maxLines: 4,
            wordWrap: true,
            font: {
                fontSize: "10dp"
            },
            bindId: "address"
        }
    };
    __alloyId696.push(__alloyId703);
    var __alloyId704 = {
        type: "Ti.UI.Label",
        bindId: "getDirection",
        properties: {
            color: Alloy.Globals.labelTitleColor,
            top: "5dp",
            left: "20dp",
            bottom: "15dp",
            font: {
                fontSize: "12dp"
            },
            text: "GET DIRECTIONS",
            bindId: "getDirection"
        }
    };
    __alloyId696.push(__alloyId704);
    var __alloyId695 = {
        properties: {
            height: Ti.UI.SIZE,
            backgroundColor: "transparent",
            width: Ti.UI.FILL,
            layout: "vertical",
            name: "blindsTemplate",
            selectionStyle: "none"
        },
        childTemplates: __alloyId696
    };
    __alloyId693["blindsTemplate"] = __alloyId695;
    var __alloyId707 = [];
    var __alloyId709 = {
        type: "Ti.UI.Label",
        bindId: "message",
        properties: {
            font: {
                fontSize: "11dp",
                fontFamily: "futura_medium_bt-webfont"
            },
            height: "15dp",
            textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
            color: "#fff",
            text: "THERE ARE NO COLLECTIONS IN THIS CATEGORY.",
            bindId: "message"
        }
    };
    __alloyId707.push(__alloyId709);
    var __alloyId706 = {
        properties: {
            backgroundColor: "#231f20",
            name: "emptyTemplate",
            bindId: "templateView"
        },
        childTemplates: __alloyId707
    };
    __alloyId693["emptyTemplate"] = __alloyId706;
    $.__views.listSection3 = Ti.UI.createListSection({
        id: "listSection3"
    });
    var __alloyId711 = [];
    __alloyId711.push($.__views.listSection3);
    $.__views.beddingListContainer = Ti.UI.createListView({
        width: Titanium.UI.FILL,
        top: "40dp",
        left: "5dp",
        right: "5dp",
        scrollType: "vertical",
        backgroundColor: "#231f20",
        separatorColor: "transparent",
        sections: __alloyId711,
        templates: __alloyId693,
        id: "beddingListContainer",
        defaultItemTemplate: "blindsTemplate",
        bottom: "5dp"
    });
    $.__views.BeddingStore.add($.__views.beddingListContainer);
    $.__views.storeLocators = Ti.UI.createScrollableView({
        views: __alloyId651,
        id: "storeLocators"
    });
    $.__views.findStoreMailView.add($.__views.storeLocators);
    $.__views.searchStoreMainViewContainer = Ti.UI.createView({
        layout: "vertical",
        top: "53dp",
        height: Titanium.UI.FILL,
        width: Titanium.UI.FILL,
        backgroundColor: "#66231f20",
        visible: "false",
        id: "searchStoreMainViewContainer"
    });
    $.__views.findStore.add($.__views.searchStoreMainViewContainer);
    $.__views.searchStoreMainView = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: Titanium.UI.FILL,
        zIndex: "100",
        backgroundColor: "#231f20",
        id: "searchStoreMainView"
    });
    $.__views.searchStoreMainViewContainer.add($.__views.searchStoreMainView);
    var __alloyId712 = {};
    var __alloyId715 = [];
    var __alloyId717 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId718 = [];
            var __alloyId719 = {
                type: "Ti.UI.Label",
                bindId: "searchListItemBindID",
                properties: {
                    textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
                    left: "20dp",
                    width: "80%",
                    color: "#fff",
                    font: {
                        fontFamily: "futura_medium_bt-webfont"
                    },
                    top: "2dp",
                    height: "50dp",
                    text: "EXCULSIVE",
                    bindId: "searchListItemBindID"
                }
            };
            __alloyId718.push(__alloyId719);
            return __alloyId718;
        }(),
        properties: {
            layout: "horizontal",
            width: Titanium.UI.FILL,
            height: Titanium.UI.SIZE,
            top: 0,
            left: 0
        }
    };
    __alloyId715.push(__alloyId717);
    var __alloyId714 = {
        properties: {
            height: Titanium.UI.SIZE,
            backgroundColor: "#231f20",
            name: "searchStoreListTemplate",
            selectionStyle: "none"
        },
        childTemplates: __alloyId715
    };
    __alloyId712["searchStoreListTemplate"] = __alloyId714;
    $.__views.searchStoreListSection = Ti.UI.createListSection({
        id: "searchStoreListSection"
    });
    var __alloyId721 = [];
    __alloyId721.push($.__views.searchStoreListSection);
    $.__views.searchStoreList = Ti.UI.createListView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        sections: __alloyId721,
        templates: __alloyId712,
        id: "searchStoreList",
        backgroundColor: "#231f20",
        defaultItemTemplate: "searchStoreListTemplate"
    });
    $.__views.searchStoreMainView.add($.__views.searchStoreList);
    $.__views.ListPagePop = Ti.UI.createView({
        height: "50dp",
        width: "50dp",
        bottom: "15dp",
        borderColor: "#803E3535",
        backgroundColor: "#fff",
        borderRadius: "25dp",
        left: "15dp",
        id: "ListPagePop"
    });
    $.__views.findStore.add($.__views.ListPagePop);
    $.__views.ListPageIcon = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "18dp"
        },
        textAlign: "center",
        text: Alloy.Globals.icon.details,
        color: "#877c7c",
        id: "ListPageIcon"
    });
    $.__views.ListPagePop.add($.__views.ListPageIcon);
    $.__views.goToPop = Ti.UI.createView({
        height: "50dp",
        width: "50dp",
        bottom: "15dp",
        borderColor: "#803E3535",
        backgroundColor: "#fff",
        borderRadius: "25dp",
        left: "70dp",
        id: "goToPop"
    });
    $.__views.findStore.add($.__views.goToPop);
    $.__views.goToMapIcon = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "18dp"
        },
        textAlign: "center",
        text: Alloy.Globals.icon.location,
        color: "#877c7c",
        id: "goToMapIcon"
    });
    $.__views.goToPop.add($.__views.goToMapIcon);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = $.args;
    var coord;
    var Map = require("ti.map");
    var mapview;
    var storeLocatorResponseData = null;
    var mapViewVisible = false;
    var stateFlag = true;
    var stateFlag1 = true;
    var stateFlag2 = true;
    var fabricListLocationData = [];
    var blindListLocationData = [];
    var openUrlDirection;
    googleAnalyticsScreen("FIND A STORE");
    $.goToPop.visible = false;
    $.ListPagePop.visible = false;
    $.searchField.addEventListener("return", enableSearch);
    isNullVal(args.type) || ("blinds" == args.type ? $.storeLocators.setCurrentPage(1) : "bedding" == args.type && $.storeLocators.setCurrentPage(2));
    getLocation();
    var style1 = $.createStyle({
        font: {
            fontSize: "10",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#e65e48"
    });
    var style = $.createStyle({
        font: {
            fontSize: "10sp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff"
    });
    $.createStyle({
        font: {
            fontWeight: "bold",
            fontSize: "13dp"
        }
    });
    $.createStyle({
        font: {
            fontFamily: "futura_lt_bt_light-webfont",
            fontSize: "13dp"
        }
    });
    var val = reverseXhdpi();
    var chkClicked = false;
    $.storeLocators.addEventListener("scroll", scrollEffect);
    $.shopingBagLbl.addEventListener("click", toggleLabelEffect1);
    $.reviewLbl.addEventListener("click", toggleLabelEffect2);
    $.beddingLbl.addEventListener("click", toggleLabelEffect3);
    $.closeStore.addEventListener("click", destroyWindow);
    touchEffect.createTouchEffect($.closeStore, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.searchStore, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.ListPageIcon, "#a6877c7c", "#877c7c");
    touchEffect.createTouchEffect($.goToMapIcon, "#a6877c7c", "#877c7c");
    $.fabricFilterMainView.addEventListener("click", function(e) {
        if (stateFlag) {
            $.styleDropDown.borderColor = "gray", $.styleDropDown.borderWidth = "0.6", $.styleDropDown.height = Titanium.UI.SIZE;
            $.fabricFilterMainView.height = Titanium.UI.FILL;
            $.sc1.height = Titanium.UI.SIZE;
            stateFlag = false;
        } else {
            if (e.source.text) {
                $.styleNameLbl.text = e.source.text;
                $.styleNameLbl.color = "#e65e48";
                selectedStyle = e.source.text;
                "ALL" != e.source.text || isNullVal(storeLocatorResponseData) ? applyFilter(e.source.id, 1) : setStoreListFabric(storeLocatorResponseData.data.store_list);
            }
            $.styleDropDown.borderColor = "transparent";
            $.styleDropDown.borderWidth = "0";
            $.styleDropDown.height = "35dp";
            $.fabricFilterMainView.height = "35dp";
            stateFlag = true;
        }
    });
    $.blindsFilterMainView.addEventListener("click", function(e) {
        if (stateFlag1) {
            $.styleDropDown1.borderColor = "gray", $.styleDropDown1.borderWidth = "0.6", $.styleDropDown1.height = Titanium.UI.SIZE;
            $.blindsFilterMainView.height = Titanium.UI.FILL;
            $.styleScroll.height = Titanium.UI.SIZE;
            stateFlag1 = false;
        } else {
            if (e.source.text) {
                $.styleNameLbl1.text = e.source.text;
                $.styleNameLbl1.color = "#e65e48";
                selectedStyle = e.source.text;
                "ALL" != e.source.text || isNullVal(storeLocatorResponseData) ? applyFilter(e.source.id, 2) : setStoreListBlind(storeLocatorResponseData.data.store_list);
            }
            $.styleDropDown1.borderColor = "transparent";
            $.styleDropDown1.borderWidth = "0";
            $.styleDropDown1.height = "35dp";
            $.blindsFilterMainView.height = "35dp";
            stateFlag1 = true;
        }
    });
    $.beddingFilterMainView.addEventListener("click", function(e) {
        if (stateFlag2) {
            Ti.API.info("filter state flag true");
            $.styleDropDown2.borderColor = "gray";
            $.styleDropDown2.borderWidth = "0.6";
            $.styleDropDown2.height = Titanium.UI.SIZE;
            $.beddingFilterMainView.height = Titanium.UI.FILL;
            $.beddingstyleScroll.height = Titanium.UI.SIZE;
            stateFlag2 = false;
        } else {
            if (e.source.text) {
                $.styleNameLbl2.text = e.source.text;
                $.styleNameLbl2.color = "#e65e48";
                selectedStyle = e.source.text;
                "ALL" != e.source.text || isNullVal(storeLocatorResponseData) ? applyFilter(e.source.id, 3) : setBeddingList(storeLocatorResponseData.data.store_list);
            }
            $.styleDropDown2.borderColor = "transparent";
            $.styleDropDown2.borderWidth = "0";
            $.styleDropDown2.height = "35dp";
            $.beddingFilterMainView.height = "35dp";
            stateFlag2 = true;
        }
    });
    $.fabricListContainer.addEventListener("itemclick", pinCurrentPoint);
    $.blindsListContainer.addEventListener("itemclick", pinCurrentPoint);
    $.beddingListContainer.addEventListener("itemclick", pinCurrentPoint);
    $.searchField.addEventListener("change", searchStore);
    $.searchStoreList.addEventListener("itemclick", getLocationFromString);
    $.findStore.addEventListener("click", function(e) {
        "textField" != e.source.type && $.searchField.blur();
    });
    $.ListPagePop.addEventListener("click", function() {
        $.map_container.visible = false;
        $.goToPop.visible = false;
        $.ListPagePop.visible = false;
        $.findStoreMailView.visible = true;
        mapViewVisible = false;
    });
    $.goToPop.addEventListener("click", function() {
        Ti.Platform.openURL(openUrlDirection);
    });
    __defers["$.__views.findStore!android:back!goToBack"] && $.addListener($.__views.findStore, "android:back", goToBack);
    __defers["$.__views.findStore!close!clearMemory"] && $.addListener($.__views.findStore, "close", clearMemory);
    __defers["$.__views.searchStore!click!enableSearch"] && $.addListener($.__views.searchStore, "click", enableSearch);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;