<template>
  <v-col>
    <v-card class="mx-auto" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <!-- <div class="overline mb-4">OVERLINE</div> -->
          <v-list-item-title class="headline mb-1">{{
            plant.name
          }}</v-list-item-title>
          <v-list-item-subtitle class="text--primary">{{
            plant.secondary_name
          }}</v-list-item-subtitle>
          <v-list-item-subtitle class="planted-information">
            Planted on {{ plant.plant_date | formatDateString }}
          </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-avatar tile size="80" color="grey">
          <img :src="plant.image" />
        </v-list-item-avatar>
      </v-list-item>

      <v-list-item>
        <div class="harvest">
          <p v-for="(harvestDate, index) in harvestDates" :key="index">
            <span class="harvestOutput" :style="harvestDate.style">{{
              harvestDate.harvestOutput ? harvestDate.harvestOutput : "Harvest"
            }}</span>
            {{ harvestDate.date | timeFromNow(harvestDate.secondDate) }},
            {{ harvestDate.date | formattedDate(harvestDate.secondDate) }}
          </p>
        </div>
      </v-list-item>

      <v-card-actions>
        <v-btn text @click="removePlant">Remove</v-btn>
      </v-card-actions>
    </v-card>
  </v-col>

  <!-- <div class="plant-item">
    <img :src="plant.image" alt="" />
    <div class="name">
      <h2>{{ plant.name }}</h2>
      <h4>{{ plant.secondary_name }}</h4>
    </div>
    <div class="planted-information">
      <p>Planted on {{ plant.plant_date | formatDateString }}</p>
    </div>
    <div class="harvest">
      <p v-for="(harvestDate, index) in harvestDates" :key="index">
        <span class="harvestOutput" :style="harvestDate.style">{{
          harvestDate.harvestOutput ? harvestDate.harvestOutput : "Harvest"
        }}</span>
        {{ harvestDate.date | timeFromNow(harvestDate.secondDate) }},
        {{ harvestDate.date | formattedDate(harvestDate.secondDate) }}
      </p>
    </div>
  </div> -->
</template>

<script>
const moment = require("moment");
export default {
  data() {
    return {
      basicColors: ["red", "orange", "green", "yellow", "blue", "purple"],
      ordinals: [
        "first",
        "second",
        "third",
        "fourth",
        "fifth",
        "sixth",
        "seventh",
        "eighth"
      ]
    };
  },

  props: {
    plant: {
      type: Object,
      default: null
    },
    index: {
      type: Number
    }
  },

  computed: {
    basicColorsPiped() {
      return this.basicColorsArray.join("|");
    },
    colorRegex() {
      return new RegExp("red|orange|green|yellow");
    },
    rangeRegex() {
      return /[\d]+[-][\d]+/g;
    },
    harvestDates() {
      // 80 green; 100 orange ripe"
      const maturityDescriptionList = this.plant.maturity.split(";");
      const harvestDates = [];
      let startInput = this.plant.plant_date;
      // if (this.plant.strategy == "transplant") {
      //   startInput = this.plant.transplant_date;
      // }
      const startDate = moment(startInput);
      for (let i = 0; i < maturityDescriptionList.length; i++) {
        let maturityDescription = maturityDescriptionList[i];
        let parsedDescriptionNumber = parseInt(maturityDescription);

        // If the description includes a color
        let harvestOutput = maturityDescription
          .replace(parsedDescriptionNumber, "")
          .trim();
        let found = false;
        for (let j = 0; j < this.basicColors.length; j++) {
          if (maturityDescription.includes(this.basicColors[j])) {
            found = true;
            let calculatedDate = startDate
              .clone()
              .add(parsedDescriptionNumber, "days");
            let color = this.basicColors[j];
            harvestDates.push({
              date: calculatedDate,
              harvestOutput: harvestOutput,
              style: {
                color: color
              }
            });
          }
        }

        let ranges = maturityDescription.match(this.rangeRegex);
        if (!found) {
          if (maturityDescription.includes("year after planting")) {
            for (let k = 1; k <= this.ordinals.length; k++) {
              if (maturityDescription.includes(this.ordinals[k])) {
                let calculatedDate = startDate.clone().add(k, "years");
                harvestDates.push({
                  date: calculatedDate,
                  harvestOutput: harvestOutput
                });
              }
            }
          } else if (ranges) {
            let rangeInts = ranges[0].split("-");
            let calculatedEarly = startDate.clone().add(rangeInts[0], "days");
            let calculatedLate = startDate.clone().add(rangeInts[1], "days");
            harvestDates.push({
              date: calculatedEarly,
              secondDate: calculatedLate,
              harvestOutput: harvestOutput.split("to ")[1]
            });
          } else if (maturityDescription.includes("Days")) {
            let calculatedDate = startDate
              .clone()
              .add(parsedDescriptionNumber, "days");
            harvestDates.push({
              date: calculatedDate
            });
          } else {
            let calculatedDate = startDate
              .clone()
              .add(parsedDescriptionNumber, "days");
            harvestDates.push({
              date: calculatedDate,
              harvestOutput: harvestOutput
            });
          }
        }
        // let returned = maturityDescription.match(this.colorRegex);
        // console.log(returned);
      }

      return harvestDates;
    }
  },

  methods: {
    removePlant() {
      this.$store.commit("removePlant", this.index);
    }
  }
};
</script>

<style lang="scss" scoped>
.planted-information {
  font-style: italic;
}

.harvest {
  // margin-top: 10px;
  p {
    margin-bottom: 4px;
  }
}
.harvestOutput {
  text-transform: capitalize;
  font-weight: bold;
}
</style>
