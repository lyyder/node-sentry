(ns sentry-test.core)

(enable-console-print!)

(.install (.config js/Raven (aget js/CONFIG "sentryDsn")))

(.setUserContext js/Raven (js-obj
                            :username "john"
                            :email "john@example.com"))

(defn error-fn []
  (.captureBreadcrumb js/Raven
                      (js-obj
                        "message" "Cljs BC 1"
                        "category" "sentry-test"
                        "data" (js-obj "foo" "bar")))

  (.captureBreadcrumb js/Raven
                      (js-obj
                        message "Cljs BC 2"
                        category "sentry-test"))

  (throw (js/Error "Sentry test err")))

(defn attach-click-listener [e]
  (.addEventListener e "click" error-fn))

(let [e (.querySelector js/document "#cljs-error-btn")]
  (attach-click-listener e))
