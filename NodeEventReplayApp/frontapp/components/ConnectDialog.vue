<template>
   <div id = 'connectDialogMain'>
      <div id = 'inputs'>
			<input class = 'inputField' id = 'brokerDomainField' placeholder = 'Broker Domain'>
         <input class = 'inputField' id = 'brokerPortField' placeholder = 'Broker Port'>
      </div>

      <div id = 'buttons'>
         <button class = 'connectActionButton' id = 'pingButton'>Ping</button>
         <button class = 'connectActionButton' id = 'connectButton'>Connect</button>
      </div>
   </div>
</template>

<script>
export default {
    name: "ConnectDialogComp"
}
</script>

<style scoped src="@/assets/css/connectpage.css" />
