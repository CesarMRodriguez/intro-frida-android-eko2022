Java.perform(function(){
      var ANDROID_VERSION_M = 23;

      var DefaultConfigSource = Java.use("android.security.net.config.ManifestConfigSource$DefaultConfigSource");
      var NetworkSecurityConfig = Java.use("android.security.net.config.NetworkSecurityConfig");

      DefaultConfigSource.$init.overload("boolean", "int").implementation = function(usesCleartextTraffic, targetSdkVersion){
             console.log("[+] Modifying DefaultConfigSource constructor");
             return this.$init.overload("boolean", "int").call(this, usesCleartextTraffic, ANDROID_VERSION_M);
      };

      var NetworkSecurityConfig_Builder =Java.use("android.security.net.config.NetworkSecurityConfig$Builder");
      NetworkSecurityConfig_Builder.getEffectiveCertificatesEntryRefs.implementation = function(){
	console.log("[+] getEffectiveCertificates");
	console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()));
             
        return this.getEffectiveCertificatesEntryRefs()
      };

      NetworkSecurityConfig.getDefaultBuilder.overload("int").implementation = function(targetSdkVersion){
             console.log("[+] getDefaultBuilder original targetSdkVersion => " + targetSdkVersion.toString());
	     console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()));
             return this.getDefaultBuilder.overload("int").call(this, ANDROID_VERSION_M);
      };

});
