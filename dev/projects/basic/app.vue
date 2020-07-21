<template>
	<div class="container">
		<h1>Basic</h1>
		<div class="row">
			<div class="col-sm-12">
				<vue-form-generator :schema="schema" :model="model" :options="formOptions" ref="form" :is-new-model="isNewModel" @model-updated="modelUpdated" @validated="onValidated"></vue-form-generator>
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

			schema: {
				fields: [
					{
						"id": "2bcc40c0-c5ff-11ea-9824-0175a287143a",
						"type": "input",
						"label": "Text1",
						"model": "Text1",
						"buttons": [
							{
								"label": "Today",
								"onclick": "console.log(this.model)"
							}
						],
						"inputType": "text",
						"autocomplete": "off"
					},
					{
						"id": "f7f40b91-cb5b-11ea-b3af-f7e83e92f441",
						"type": "switch",
						"label": "test visibility",
						"model": "testvisibility",
						"textOn": "Yes",
						"textOff": "No",
						"valueOn": true,
						"required": false,
						"valueOff": false
					},
					{
						"id": "01eefa13-cb5c-11ea-b3af-f7e83e92f441",
						"type": "input",
						"label": "Number23",
						"model": "Number23",
						"visible": (model) => !model.testvisibility,
						"inputType": "text"

					},
					{
						"id": "3463e365-cb5d-11ea-b3af-f7e83e92f441",
						"type": "input",
						"label": "TextWithInitial",
						"model": "TextWithInitial",
						"visible": (model) => !model.testvisibility,
						"initial": (model) => model.Text1 ? "test 1": "test2",
						"inputType": "text",
						"autocomplete": "off"
					}
				]
			},

			formOptions: {
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
			console.log("VFG validated:", res, errors);
		},

		modelUpdated(newVal, schema) {
			console.log("main model has updated", newVal, schema);
		}
	},

	mounted() {
		this.$nextTick(function() {
			window.app = this;
		});
	}
};
</script>

<style lang="scss">
@import "../../style.scss";
</style>
