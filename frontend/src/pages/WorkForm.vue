<!DOCTYPE html>
<html>
<head>
  <title>Work Order Request Form</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.4.4/css/bulma.min.css">
</head>

<body>
  <div class="columns" id="app">
    <div class="column is-two-thirds">
      <section class="section">
        <h1 class="title">Work Order Request</h1>
        <p class="subtitle">
          All fields <strong>must</strong> be completed.
        </p>
        <hr>      
        
        <!-- form starts here -->
        <section class="form">
        <form v-on:submit.prevent="$validator.validateAll(); console.log(form);">
          <div class="field">
            <label class="label">Equiment ID</label>
            <div class="control">
              <input ID="ID" v-model="form.ID" v-validate="'required|min:3'" v-bind:class="{'is-danger': errors.has('ID')}" class="input" type="text" placeholder="Equipment ID">
            </div>
            <p class="help is-danger" v-show="errors.has('ID')">
              {{ errors.first('ID') }}
            </p>
          </div>

          <div class="field">
            <label class="label">Equipment Type</label>
            <div class="control">
              <div class="select">
                <select v-model="form.Equipment">
                    <option disabled value="">Nothing selected</option>
                    <option v-for="option in options.equip" v-bind:value="option.value">
                      {{ option.text }}
                    </option>
                  </select>
              </div>
            </div>
          </div>

          <div class="field">
            <div class="control">
              <label class="checkbox">
                  <input type="checkbox" v-model="form.terms">
                  I agree to the <a href="#">terms and conditions</a>
                </label>
            </div>
          </div>

          <div class="field is-grouped">
            <div class="control">
              <button v-bind:disabled="errors.any()" class="button is-primary">
                Submit
              </button>
            </div>
          </div>

        </form>
      </section>
    </section>
  </div>

  <div class="column">
    <section class="section" id="results">
      <div class="box">
        <ul>
          <li v-for="(item, k) in form">
            <strong>{{ k }}:</strong> {{ item }}</li>
        </ul>

      </div>
    </section>
  </div>

</section>
      </section>
    </div>
  </div>
  
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.3.4/vue.min.js"></script>

<script>
  new Vue({
    el: '#app'
        data: {
            form : {
                ID: '',
                Equipment: '' // drop down box (single value selectable)
             },
             options: {
                equip: [
                    { value: 'feature', text: "Pump"},
                    { value: 'feature', text: "Conveyer"},
                    { value: 'feature', text: "Seperator"}
                    { value: 'feature', text: "Sensor"}
                    { value: 'feature', text: "Security"}
                    { value: 'feature', text: "Electricity"}
                    { value: 'feature', text: "Networking"}
                    { value: 'feature', text: "Vehicle"}
                    { value: 'feature', text: "HVAC"}
                    { value: 'feature', text: "Compressor"}
                    { value: 'feature', text: "HVAC"}
                ]
            }
        }
  })
</script>

</body>
</html>