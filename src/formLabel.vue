<template>
	<label :for="fieldId" :class="labelClass">
		<span v-html="field.label"></span>
		<span v-if='field.help' class="help">
				<i class="icon"></i>
				<div class="helpText" v-html='field.help'></div>
			</span>
	</label>
</template>

<script>
import {isArray} from "lodash";

export default {
	name: "formLabel",
	props: {
		"field": Object,
		"fieldId": String
	},
	computed: {
		labelClass() {
			let ret = [];
			if (isArray(this.field.labelClasses)) {
				ret = ret.concat(this.field.labelClasses);
			} else {
				ret.push(this.field.labelClasses);
			}

			if(this.field.type === "checkbox"){
				ret.push("form-check-label");
			}
			return ret;
		}
	}
};
</script>

<style scoped>

</style>
