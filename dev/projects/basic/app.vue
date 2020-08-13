<template>
	<div class="container">
		<h1>Basic</h1>
		<div class="row">
			<div class="col-sm-12">
				<vue-form-generator :schema="schema" :model="model" :options="formOptions" ref="form"
									:is-new-model="isNewModel" @model-updated="modelUpdated"
									@validated="onValidated"></vue-form-generator>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-12">
				<pre v-if="model" v-html="prettyModel"></pre>
			</div>
		</div>
	</div>
</template>

<script>
import mixinUtils from "../../mixins/utils.js";

export default {
	mixins: [mixinUtils],

	data() {
		return {
			isNewModel: false,

			selected: [],

			model: {
				first_name: "David",
				last_name: "Higgins",
				status: true
			},

			"schema": {
				"groups": [
					{
						"id": "d57f4000-dbed-11ea-9715-830797583396",
						"fields": [
							{
								"id": "d7ffd060-dbed-11ea-9715-830797583396",
								"type": "switch",
								"label": "visibility",
								"model": "visibility",
								"textOn": "Yes",
								"textOff": "No",
								"valueOn": true,
								"required": false,
								"valueOff": false
							},
							{
								"id": "e167a6a1-dbed-11ea-9715-830797583396",
								"type": "input",
								"label": "Text ",
								"model": "complex.test",
								"visible": (model) => !model['visibility'],
								"inputType": "text",
								"autocomplete": "off"
							},
							{
								"id": "e167a6a1-dbed-11ea-9715-830797583396",
								"type": "input",
								"label": "Text ",
								"model": "complex.name",
								"visible": (model) => !model['visibility'],
								"inputType": "text",
								"autocomplete": "off"
							},
							{
								"id": "ee0e5431-dbed-11ea-9715-830797583396",
								"type": "checkbox",
								"label": "Checkbox ",
								"model": "Checkbox",
								"visible": (model) => !model['visibility'],
							}
						],
						"styleClasses": "col-md"
					}
				]
			},

			formOptions: {
				deleteDataOnHide: true,
				validateAfterLoad: true,
				validateAfterChanged: true,
				validateBeforeSave: true
			}
		};
	},

	methods: {
		showWarning() {
			if (this.$refs.form && this.$refs.form.errors) {
				return this.$refs.form.errors.length > 0;
			}
		},

		onValidated(res, errors) {
			//console.log("VFG validated:", res, errors);
		},

		modelUpdated(newVal, schema) {
			//console.log("main model has updated", newVal, schema);
		}
	},

	mounted() {
		this.$nextTick(function () {
			window.app = this;
		});
	}
};
</script>

<style lang="scss">
@import "../../style.scss";
</style>
