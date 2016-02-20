// Attach this script to the door trigger gameobject.
// By default any driving/car/control component script in the inspector should start out at disabled
// so it will not move as the Player is being controlled by you, the user.

var car : Transform;
var player : Transform;
var exitPoint : Transform; // Place this empty gameobject next to the driver car door.
var doorTriggerLeft : Transform;
var PlayerCamera : Camera;
var CarCamera : Camera; // By default the camera "component" for the car camera should be set to OFF first.
var isPlayerVisible : boolean;


function Update()
{
if (Input.GetKeyUp("f")&& isPlayerVisible) //Asign any key you want to enter/operate vehicle.
{
Debug.Log("Driving");
// make player invisible and still standing
player.gameObject.SetActiveRecursively(false);
player.gameObject.active = false;
// parent player to Exit Point
player.parent = exitPoint.transform;
player.transform.localPosition = Vector3(-1.5,0,0);
// parent PlayerParent to car
exitPoint.parent = car.transform;
exitPoint.transform.localPosition = Vector3(-0.3,1.5,-0.65); //Driverside exit point, adjust accordingly per vehicle.
// GameObject.Find("VehicleObjectName").GetComponent("DrivingScriptHere").enabled=true;
GameObject.Find("Car").GetComponent("Car").enabled=true; //Enables the script component to operate Vehicle.
PlayerCamera.enabled = false; //Disables the playerCamera
CarCamera.enabled = true; //Enables the carCamera
}
else
{
if (Input.GetKeyUp("r")) //Asign any key you want to exit/park vehicle.
{
Debug.Log("Walking");
// make character visible again
player.gameObject.SetActiveRecursively(true);
player.gameObject.active = true;
// unparent player from everything
player.transform.parent = null;
// exitPoint.parent = doorTriggerLeft.transform;
// parent Exit Point to car gameobject
exitPoint.parent = car.transform;
// GameObject.Find("VehicleObjectName").GetComponent("DrivingScriptHere").enabled=false;
GameObject.Find("Car").GetComponent("Car").enabled=false; //Disables the script component to park Vehicle.
PlayerCamera.enabled = true; //re-enables player camera
CarCamera.enabled = false; //disables car camera

}
}
}

function OnTriggerEnter(Player : Collider)
{
Debug.Log("Trigger Enter");
isPlayerVisible = true;
}

function OnTriggerExit(Player : Collider)
{
Debug.Log("Trigger Exit");
isPlayerVisible = false;
}
