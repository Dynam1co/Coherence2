#pragma strict

// Ruedas. Movimiento coche
var ruedaFD : WheelCollider;
var ruedaFI : WheelCollider;
var ruedaTD : WheelCollider;
var ruedaTI : WheelCollider;

// Giro ruedas
var ruedaFDTrans : Transform;
var ruedaFITrans : Transform;
var ruedaTDTrans : Transform;
var ruedaTITrans : Transform;

// Parámetros varios
var maxTorque : float = 150;
var anguloGiro : float = 15;

var pulsadaArriba : boolean = false;
var pulsadaAbajo : boolean = false;

function Start () {
	// Inclinación del coche al girar
	GetComponent.<Rigidbody>().centerOfMass.y = 0.3;
}

// El fixed update permite que la función se ejecute más de una vez por frame
function FixedUpdate () {
	// Eje vertical de las ruedas (Aceleración)
	//ruedaTD.motorTorque = maxTorque * Input.GetAxis("Vertical");
	//ruedaTI.motorTorque = maxTorque * Input.GetAxis("Vertical");

	var intMultiplicador : int;

	intMultiplicador = 0;

	if ((Input.GetKey(KeyCode.DownArrow) && (!pulsadaAbajo))) {
		intMultiplicador = -100000;

		pulsadaAbajo = true;
		pulsadaArriba = false;
	} else if ((Input.GetKey(KeyCode.UpArrow)) && (!pulsadaArriba)) {
		intMultiplicador = 100000;

		pulsadaAbajo = false;
		pulsadaArriba = true;
	}

	Debug.LogError(intMultiplicador);

	ruedaTD.motorTorque = maxTorque * Input.GetAxis("Vertical") + intMultiplicador;
	ruedaTI.motorTorque = maxTorque * Input.GetAxis("Vertical") + intMultiplicador;

	// Eje horizontal de las ruedas (Giro)
	ruedaFD.steerAngle = anguloGiro * Input.GetAxis("Horizontal");
	ruedaFI.steerAngle = anguloGiro * Input.GetAxis("Horizontal");
}

function Update() {
	// Giro de las ruedas
	ruedaFDTrans.Rotate(ruedaFD.rpm / 60 * 360 * Time.deltaTime, 0, 0);
	ruedaFITrans.Rotate(ruedaFI.rpm / 60 * -360 * Time.deltaTime, 0, 0);
	ruedaTDTrans.Rotate(ruedaTD.rpm / 60 * 360 * Time.deltaTime, 0, 0);
	ruedaTITrans.Rotate(ruedaTI.rpm / 60 * -360 * Time.deltaTime, 0, 0);

	// Movimiento de las ruedas delanteras al cambiar de dirección
	ruedaFITrans.localEulerAngles.y = ruedaFI.steerAngle - ruedaFITrans.localEulerAngles.z + 180;  // Añadimos 180 grados para que la rueda no esté del revés
	ruedaFDTrans.localEulerAngles.y = ruedaFD.steerAngle - ruedaFDTrans.localEulerAngles.z;
}