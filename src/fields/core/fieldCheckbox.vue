<template>
	<div :class="schema.fieldClasses" class="custom-control custom-switch">
		<input :id="getFieldID(schema)"
		type="checkbox"
		v-model="value"
		:autocomplete="schema.autocomplete"
		:disabled="disabled"
		:name="schema.inputName"
		:required="schema.required"
		v-attributes="'input'" >
      <label class="custom-control-label" :for="getFieldID(schema)">Toggle this switch element</label>
	</div>

</template>

<script>
import abstractField from "../abstractField";

export default {
	mixins: [abstractField]
};
</script>

<style lang="scss">
.vue-form-generator .field-checkbox input {
	margin-left: 12px;
}
</style>
