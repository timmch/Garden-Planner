<template>
  <div class="plant-item">
    <div class="name">
      <h2>{{ plant.name }}</h2>
      <h4>{{ plant.secondary_name }}</h4>
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
  </div>
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
  }
};
</script>

<style lang="scss" scoped>
.plant-item {
  border-bottom: 2px solid #999;
  border-radius: 3px;
  margin: 0 0 10px;
  padding: 2px 0 16px;
  display: flex;
  flex-direction: column;
  div.name {
    h2 {
      margin: 0 0 2px;
    }
    h4 {
      margin: 0px;
    }
  }
  div.harvest {
    p {
      margin: 4px 0px;
    }
  }
  .harvestOutput {
    text-transform: capitalize;
  }
}
</style>
