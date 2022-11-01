//frida -U --no-pause -f com.example.ritesh.mybasiccalculator_riteshbhat

//Java.perform se asegura que la funcion que se pasa, corre en el thread de la VM
Java.perform( function () { 
	//Java.use devuelve un objeto de javascript wrappeada en una clase cargada en la VM
	var activity_class = Java.use("com.example.ritesh.mybasiccalculator_riteshbhat.MainActivity"); 
	//forma de sobreescribir un metodo de una clase (en este caso el metodo add de la clase
	// MainActivity)	
	activity_class.add.implementation = function (int1, int2) { 
		//console.log muestra por pantalla lo que se pasa 
		console.log("[+] se llama add"); 
		//this hace referencia al objeto del tipo MainActivity. 
		return this.add(int1,int2); 
	} 
});


-- mostrar que se puede modificar y se pisa la función inicual
Java.perform( function () { 
	var activity_class = Java.use("com.example.ritesh.mybasiccalculator_riteshbhat.MainActivity"); 
	activity_class.add.implementation = function (int1, int2) { 
		console.log("[+] se llama add 2"); 
		return this.add(int1,int2); } 
});

-- mostrar cómo se puede modificar una función (caso error no obvio)
Java.perform( function () { 
	var activity_class = Java.use("com.example.ritesh.mybasiccalculator_riteshbhat.MainActivity"); 
	activity_class.add.implementation = function (p_int1, p_int2) {
 
		return p_int1 - p_int2; 
	} 
});

-- forma correcto de hacerlo
Java.perform( function () { 
	var activity_class = Java.use("com.example.ritesh.mybasiccalculator_riteshbhat.MainActivity"); 
	activity_class.add.implementation = function (p_int1, p_int2) {
		console.log("[+] p_int1" + p_int1);
		var Integer = Java.use("java.lang.Integer");
    		//console.log(p_int1.$className);
		//Usar operaciones de Integer para sumar. Primero se usa la funcion estatica sum que recibe dos int, en vez de Integer
		return Integer.$new(p_int1.intValue() - p_int2.intValue());
	} 
});

-- ejemplo de trackeo de funciones
Java.perform( function() {
	var activity_class = Java.use("com.example.ritesh.mybasiccalculator_riteshbhat.MainActivity");
	activity_class.executeToast.implementation = function (view, message) {
	
	var bt = Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new());
	console.log("\nBacktrace:\n" + bt);
	
	this.executeToast(view, message);	
	}
});



---- otros ejemplos ----



-- otra forma de hacerlo (con funcionalidad conocida)
Java.perform( function () { 
	var activity_class = Java.use("com.example.ritesh.mybasiccalculator_riteshbhat.MainActivity"); 
	activity_class.add.implementation = function (p_int1, p_int2) {
		return this.subtract(p_int1,p_int2);
	} 
});

Java.perform( function () { 
	var activity_class = Java.use("com.example.ritesh.mybasiccalculator_riteshbhat.MainActivity"); 
	activity_class.executeToast.implementation = function (view, message) {
		this.executeToast(view,"Pwneadisimo!!!");
	} 
});


-- ejemplo de trackeo de funciones
Java.perform( function() {
	var activity_class = Java.use("com.example.ritesh.mybasiccalculator_riteshbhat.MainActivity");
	activity_class.getName.implementation = function () {
			Java.perform( function() {			
				var bt = Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new());
				console.log("\nBacktrace:\n" + bt);
			});
			return this.getName();	
	}
});

-- funcion cambio String
Java.perform( function() {
	var activity_class = Java.use("com.example.ritesh.mybasiccalculator_riteshbhat.MainActivity");
	activity_class.executeToast.implementation = function (view, message) {
		this.executeToast(view, "Toasted: " + message);	
	}
});


-- funcion cambio String
Java.perform( function() {
	var activity_class = Java.use("com.example.ritesh.mybasiccalculator_riteshbhat.MainActivity");
	activity_class.testCharSequence.implementation = function (charSequence) {
		this.testCharSequence("otro char sequence");	
	}
});

-- automatizacion de pruebas
Java.perform(function(){
      Java.choose("com.example.ritesh.mybasiccalculator_riteshbhat.MainActivity",{
         onMatch: function(activity){
            if(activity.hasWindowFocus()){
               var looper=Java.use("android.os.Looper");
               looper.prepare();
		var BufferType= Java.use('android.widget.TextView$BufferType');
      		var SPANNABLE = BufferType.valueOf("SPANNABLE");
      		var texto = "10";
		var stringClass = Java.use("java.lang.String");
		var charSequenceClass = Java.use("java.lang.CharSequence");
		var stringInstance = Java.cast(stringClass.$new("10"),charSequenceClass);
		console.log(stringInstance.$className);
		console.log(SPANNABLE.$className);
               activity.editText.value.setText(Java.cast(stringClass.$new("10"),charSequenceClass),SPANNABLE.value);
               activity.editText2.value.setText(Java.cast(stringClass.$new("10"),charSequenceClass),SPANNABLE.value);
            }
         },
         onComplete:function() { /* cunao se terminaron de procesar las referencias */ }
      });
   });



Java.perform(function(){
      Java.choose("com.example.ritesh.mybasiccalculator_riteshbhat.MainActivity",{
         onMatch: function(activity){
            if(activity.hasWindowFocus()){
               //se hace cuando se encuentra una actividad
            }
         },
         onComplete:function() { /* cunao se terminaron de procesar las referencias */ }
      });
   });



















