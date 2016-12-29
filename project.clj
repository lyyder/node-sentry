(defproject sentry-test "0.1.0-SNAPSHOT"
  :dependencies [[org.clojure/clojure "1.8.0"]
                 [org.clojure/clojurescript "1.9.229"]]
  :plugins [[lein-figwheel "0.5.8"]
            [lein-cljsbuild "1.1.4" :exclusions [[org.clojure/clojure]]]]
  :clean-targets ^{:protect false} [:target-path "/public/js/cljs"]
  :cljsbuild {
    :builds [{:id "dev"
              :source-paths ["src"]
              :figwheel true
              :compiler {:main "sentry-test.core"
                         :asset-path "js/cljs"
                         :output-to "public/js/cljs/sentrytest.js"
                         :output-dir "public/js/cljs"}}]})

