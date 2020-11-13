<template>
	<div class="form-group" :class="getFieldRowClasses(field)">
		<form-label
			v-if="fieldTypeHasLabel(field) && labelFirst(field)"
			:fieldId="getFieldID(field)"
			:field="field"
		>
		</form-label>

		<component ref="child" :is="getFieldType(field)" :vfg="vfg" :class="{'is-invalid': fieldErrors(field).length > 0}" :disabled="fieldDisabled(field)" :model="model" :schema="field" :formOptions="options" @model-updated="onModelUpdated" @validated="onFieldValidated"></component>

		<!-- Some components the label comes after the input field -->
		<form-label
			v-if="fieldTypeHasLabel(field) && !labelFirst(field)"
			:fieldId="getFieldID(field)"
			:field="field"
		>
		</form-label>

		<div v-if="buttonVisibility(field)" class="buttons">
			<button v-for="(btn, index) in field.buttons" @click="buttonClickHandler(btn, field, $event)" :class="btn.classes" :key="index" v-text="btn.label" :type="getButtonType(btn)"></button>
		</div>

		<div v-if="fieldErrors(field).length > 0" class="invalid-feedback">
			<span v-for="(error, index) in fieldErrors(field)" :key="index" v-html="error"></span>
		</div>

		<small v-if="field.hint" class="form-text text-muted" v-html="fieldHint(field)"></small>
	</div>
</template>
<script>
import { get as objGet, isNil, isFunction } from "lodash";
import { slugifyFormID } from "./utils/schema";
import formMixin from "./formMixin.js";
import fieldComponents from "./utils/fieldsLoader.js";
import formLabel from "./formLabel";

export default {
	name: "form-group",
	components: {...fieldComponents, formLabel},
	mixins: [formMixin],
	props: {
		vfg: {
			type: Object,
			required: true
		},
		model: Object,
		options: {
			type: Object
		},
		field: {
			type: Object,
			required: true
		},
		errors: {
			type: Array,
			default() {
				return [];
			}
		}
	},
	methods: {
		// Should field type have a label?
		fieldTypeHasLabel(field) {
			if (isNil(field.label)) return false;

			let relevantType = "";
			if (field.type === "input") {
				relevantType = field.inputType;
			} else {
				relevantType = field.type;
			}

			switch (relevantType) {
				case "button":
				case "submit":
				case "reset":
					return false;
				default:
					return true;
			}
		},
		getFieldID(schema) {
			const idPrefix = objGet(this.options, "fieldIdPrefix", "");
			return slugifyFormID(schema, idPrefix);
		},
		// Get type of field 'field-xxx'. It'll be the name of HTML element
		getFieldType(fieldSchema) {
			return "field-" + fieldSchema.type;
		},
		// Get type of button, default to 'button'
		getButtonType(btn) {
			return objGet(btn, "type", "button");
		},
		// Child field executed validation
		onFieldValidated(res, errors, field) {
			this.$emit("validated", res, errors, field);
		},
		buttonVisibility(field) {
			return field.buttons && field.buttons.length > 0;
		},
		buttonClickHandler(btn, field, event) {
			return btn.onclick.call(this, this.model, field, event, this);
		},
		// Get current hint.
		fieldHint(field) {
			if (isFunction(field.hint)) return field.hint.call(this, this.model, field, this);

			return field.hint;
		},
		fieldErrors(field) {
			return this.errors.filter((e) => e.field === field).map((item) => item.error);
		},
		onModelUpdated(newVal, schema) {
			this.$emit("model-updated", newVal, schema);
		},
		validate(calledParent) {
			return this.$refs.child.validate(calledParent);
		},
		clearValidationErrors() {
			if (this.$refs.child) {
				return this.$refs.child.clearValidationErrors();
			}
		},
		labelFirst(field){
			return field.type !== "checkbox";
		}
	}
};
</script>
<style lang="scss">
$errorColor: #f00;
.vue-form-generator .form-group:not([class*=" col-"]) {
	width: 100%;
}
.vue-form-generator .form-group {

	&.featured {
		> label {
			font-weight: bold;
		}
	}

	&.required {
		> label:after {
			content: "*";
			font-weight: normal;
			color: Red;
			// position: absolute;
			padding-left: 0.2em;
			font-size: 1em;
		}
	}
}
</style>
