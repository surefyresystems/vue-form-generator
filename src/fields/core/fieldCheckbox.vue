<template lang="pug">
	input.form-check-input(:id="getFieldID(schema)", @blur="onDataAccept", type="checkbox", v-model="value", :autocomplete="schema.autocomplete", :disabled="disabled", :name="schema.inputName", :class="schema.fieldClasses", :required="schema.required", v-attributes="'input'")
</template>

<script>
import abstractField from "../abstractField";

export default {
	mixins: [abstractField]
};
</script>

<style lang="scss">
</style>
