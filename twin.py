from azure.iot.device import IoTHubModuleClient, Message


# CONNECTION_STRING = "HostName=EDGTneerTrainingPractice.azure-devices.net;DeviceId=edgeDevive-opcua;SharedAccessKey=jiDsujbUvP2MySzcHAg+eDYEKf97zrh+YTqM6sGjkQU="


def create_client():
   # Instantiate client
   try:  
       client = IoTHubModuleClient.create_from_edge_environment()
       # client = IoTHubModuleClient.create_from_connection_string(CONNECTION_STRING)

   except Exception as e:
       print("Error occured:", e)    

   def twin_patch_handler(twin_patch):
       print("Twin patch received:")
       print(twin_patch)

   try:
       client.on_twin_desired_properties_patch_received = twin_patch_handler
   except:
       client.shutdown()
   try:
       twin = client.get_twin()
       print(twin)
   except Exception as e:
       print(e)


if __name__ == "__main__":

   create_client()
