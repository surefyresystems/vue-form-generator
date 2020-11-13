<template>
	<label :for="fieldId" :class="field.labelClasses">
		<span v-html="field.label"></span>
		<span v-if='field.help' class="help">
				<i class="icon"></i>
				<div class="helpText" v-html='field.help'></div>
			</span>
	</label>
</template>

<script>
export default {
	name: "formLabel",
	props: {
		"field": Object,
		"fieldId": String
	}
};
</script>

<style scoped>

</style>
