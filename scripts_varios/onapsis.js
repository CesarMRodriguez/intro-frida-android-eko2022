//frida -U --no-pause -l onapsis.js -f com.onapsis.ekochallenge2017
Java.perform(function () {

	//el resultado es 662032
	var secretClass = Java.use("com.onapsis.ekochallenge2017.Secret");
	var secretObject = secretClass.$new(null);
	//objectToCheck = secretObject.message;
	//console.log(secretObject.decrypt("550113"));	
	for (var i = 600000; i <= 700000; i++) {
		if (i % 1000 == 0) console.log("Corriendo: " + i); 
		secretObject.message.value = "zv5q1QJTJtkcx/OJUgl+i2ZxJ8OFW7/ig9ColAgi89xNMtoMMhCrqVKRjYkADzYzDAHYLkKVU3tM+/RCcYhNuw==";
		if (secretObject.decrypt(String(i))) {
			try {
				if (/^[a-z0-9!"#$%&'()*+,.\/:;<=>?@\[\] ^_`{|}~-]*$/i.test(secretObject.message.value))
					console.log(String(i) + ":" + secretObject.message.value);
			} catch (e) {
				//console.log("Se imprimen los errores");			
			}		
		}	
	} 
	
});
