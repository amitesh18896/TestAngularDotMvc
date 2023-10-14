using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace WebApp.App_Start
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/Script/Bundles")
                  .Include(
                      "~/bundles/inline.*",
                      "~/bundles/polyfills.*",
                      "~/bundles/scripts.*",
                      "~/bundles/vendor.*",
                      "~/bundles/runtime.d8200fa24cda1c24.*",
                        "~/bundles/polyfills.a391255fa378d155.*",
                   "~/bundles/main.65e6b3cb5d73a2d8.*",
                     "~/bundles/main.*"));
            bundles.Add(new StyleBundle("~/Content/Styles")
                .Include("~/bundles/styles.*"));


            //     bundles.Add(new StyleBundle("~/Content/Styles").Include(
            //    "~/Content/bootstrap.css",
            //    "~/Content/site.css"
            //));

            //     bundles.Add(new ScriptBundle("~/bundles/Scripts").Include(
            //         "~/Scripts/jquery-{version}.js",
            //         "~/Scripts/bootstrap.js",
            //         "~/Scripts/angular.js",
            //         "~/Scripts/app.js"  // Your application scripts
            //     ));


        }
    }
}