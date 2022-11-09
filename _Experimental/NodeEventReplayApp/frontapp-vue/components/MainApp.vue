<template>
	<div id = 'mainApp'>
		<div id = 'controlPane'>
			<div id = 'topicSelector'>
				<button id = 'topicMenuButton'>Select a topic</button>
				<div id = 'dropdownMenu'>
					<a href = '#'>tbSorted</a>
					<a href = '#'>tbSortedResults</a>
					<a href = '#'>__consumer_offsets</a>
				</div>
			</div>

			<button>Start Stream</button>
		</div>

		<DataPaneFields />
		<div id = 'streamLogPane'>
			<div id = 'streamLog'>
				<DataPane />
				<DataPane />
				<DataPane />
				<DataPane />
				<DataPane />
				<DataPane />
				<DataPane />
				<DataPane />
				<DataPane />
				<DataPane />
			</div>
		</div>
   </div>
</template>

<script>
export default {
    name: "MainAppComp"
}
</script>

<style scoped src = '@/assets/css/mainpage.css'/>
<style scoped src = '@/assets/css/dropdownmenu.css'/>
