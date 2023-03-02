<template>
  <div>
    <header-component/>
    <preloader-block style="margin-top: 200px" v-if="showPreloader"/>
    <div v-else class="container-analytics">
      <h1>Аналитика</h1>
      <div class="line"></div>

      <percentage-of-students-block
          :dataGroup="dataGroup"
          :dataResult="dataResult"
      />

     <response-rate-block
         :dataGroup="dataGroup"
         :dataResult="dataResult"
     />

      <absolute-progress-block
          :dataGroup="dataGroup"
          :dataResult="dataResult"
      />

      <qualitative-progress-block
          :dataGroup="dataGroup"
          :dataResult="dataResult"
      />

      <moda-block
          :dataGroup="dataGroup"
          :dataResult="dataResult"
      />

      <medain-block
      :dataGroup="dataGroup"
      :dataResult="dataResult"
      />

      <average-score-block
          :dataGroup="dataGroup"
          :dataResult="dataResult"
      />

      <span-variation-block
          :dataGroup="dataGroup"
          :dataResult="dataResult"
      />

      <dispersion-block
          :dataGroup="dataGroup"
          :dataResult="dataResult"
      />

      <standard-deviation-block
          :dataGroup="dataGroup"
          :dataResult="dataResult"
      />

      <coefficient-variation-block
          :dataGroup="dataGroup"
          :dataResult="dataResult"
      />

      <all-group-progress-block
          :dataGroup="dataGroup"
          :dataResult="dataResult"
      />

      <score-comparison-block
          :dataGroup="dataGroup"
          :dataResult="dataResult"
      />

    </div>
  </div>
</template>

<script>
import HeaderComponent from "@/components/unitComponents/headerComponent";
import MedainBlock from "@/components/unitComponents/teacherAnalyticsComponents/medainBlock.vue";
import ModaBlock from "@/components/unitComponents/teacherAnalyticsComponents/modaBlock.vue";
import AbsoluteProgressBlock from "@/components/unitComponents/teacherAnalyticsComponents/absoluteProgressBlock.vue";
import QualitativeProgressBlock
  from "@/components/unitComponents/teacherAnalyticsComponents/qualitativeProgressBlock.vue";
import AverageScoreBlock from "@/components/unitComponents/teacherAnalyticsComponents/averageScoreBlock.vue";
import PercentageOfStudentsBlock
  from "@/components/unitComponents/teacherAnalyticsComponents/percentageOfStudentsBlock.vue";
import ResponseRateBlock from "@/components/unitComponents/teacherAnalyticsComponents/responseRateBlock.vue";
import AllGroupProgressBlock from "@/components/unitComponents/teacherAnalyticsComponents/allGroupProgressBlock.vue";
import SpanVariationBlock from "@/components/unitComponents/teacherAnalyticsComponents/spanVariationBlock.vue";
import DispersionBlock from "@/components/unitComponents/teacherAnalyticsComponents/dispersionBlock.vue";
import StandardDeviationBlock from "@/components/unitComponents/teacherAnalyticsComponents/standardDeviationBlock.vue";
import CoefficientVariationBlock
  from "@/components/unitComponents/teacherAnalyticsComponents/coefficientVariationBlock.vue";
import PreloaderBlock from "@/components/unitComponents/preloaderBlock.vue";
import ScoreComparisonBlock from "@/components/unitComponents/teacherAnalyticsComponents/scoreComparisonBlock.vue";

export default {
  name: "AnalyticsDataPage",
  components: {
    ScoreComparisonBlock,
    PreloaderBlock,
    CoefficientVariationBlock,
    StandardDeviationBlock,
    DispersionBlock,
    SpanVariationBlock,
    AllGroupProgressBlock,
    ResponseRateBlock,
    PercentageOfStudentsBlock,
    AverageScoreBlock,
    QualitativeProgressBlock, AbsoluteProgressBlock, ModaBlock, MedainBlock, HeaderComponent},
  data() {
    return {
      showPreloader: true,
      visible: {
        percentageOfStudents: false,
        responseRate: false,
        absoluteProgress: false,
        qualitativeProgress: false,
        median: false,
        moda: false,
        averageScore: false,
        spanVariation: false,
        dispersion: false,
        deviation: false,
        coefficientVariation: false,
        value12: false,
        value13: false,
      },
      result: {
        percentageOfStudents: null,
        responseRate: null,
        absoluteProgress: null,
        qualitativeProgress: null,
        moda: null,
        averageScore: null,
        spanVariation: null,
        dispersion: null,
        deviation: null,
        coefficientVariation: null,
        value12: null,
        value13: null,
      },
      dataGroup: {},
      dataResult: {},
    }
  },
  methods: {
  },
  async created() {
    this.sessionId = JSON.parse(localStorage.getItem('sessionId'))
    await fetch(`auth/sessionId?sessionId=${this.sessionId}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
    })
        .then(response => response.json())
        .then(data => {return this.dataUser = data});
    await fetch(`student/group/byTeacherId?teacherId=${this.dataUser.id}&sessionId=${this.sessionId}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    })
        .then(response => response.json())
        .then(data => {return this.dataGroup = data});
    // Получаем данные о тестах
    await fetch(`/result/groups?sessionId=${this.sessionId}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    })
        .then(response => response.json())
        .then(data => {
          this.dataResult = data;
        });
    this.showPreloader = false
  },
}
</script>

<style scoped>
.container-analytics{
  padding: 0 80px;
}
h1{
  font-weight: 600;
  font-size: 28px;
  line-height: 44px;
  color: #26AF11;
  margin: 38px 0;
}
.line{
  height: 1px;
  background: #49485E;
  margin-bottom: 32px;
}
h2{
  font-weight: 600;
  font-size: 26px;
  line-height: 31px;
  color: #3F8035;
  margin-top: 35px;
}
.analytic-block--options{
  display: flex;
  justify-content: center;
}
.analytic-block--options:last-child{
  margin-bottom: 60px;
}
select{
  background: #FFFEFB;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  color: #737361;
  border: #FFFEFB;
  padding: 11px 12px 11px 16px;
  height: 36px;
  margin: 6px 44px 0 27px;
}
.select-group{
  width: 147px;
}
p{
  font-weight: 600;
  font-size: 16px;
  color: #49485E;
}
select:active, select:focus{
  outline:none
}
button{
  padding: 9px 55px;
  background: #7BAE73;
  border-radius: 14px;
  border: 2px solid #7BAE73;
  font-weight: 600;
  font-size: 13px;
  line-height: 15px;
  text-align: center;
  color: #FFFEFB;
  height: 38px;
  margin-top: 7px;
}
button:hover{
  background: #61e431;
}
.select-grade{
  width: 190px;
}
.text-analitics{
  font-size: 21px;
  margin: 50px auto 60px;
  color: #53760e;
  line-height: 1.5;
}
.text-analitics span{
  color: #43e70b;
}
</style>
