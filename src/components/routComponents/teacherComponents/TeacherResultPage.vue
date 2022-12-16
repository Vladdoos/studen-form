<template>
  <div>
    <header-component/>
    <div class="container-allResult">
      <h1>Результаты студентов</h1>
      <preloader-block v-if="showPreloader"/>
      <ul v-else class="block-group">
        <li
            v-for="test of testsResults"
            :key="test.index"
        >
          {{test.name}}
          <div class="block-i" @click="showGroup(test)">
            <i class="arrow down" :class="{up: test.visible}">
            </i>
          </div>

          <ul class="block-list" v-if="test.visible">

            <li v-for="group of test.group" :key="group.index">{{group.title}}
              <div class="block-i" @click="showList(group)">
                <i class="arrow down" :class="{up: group.visible}" ></i>
              </div>
              <p class="block-list__text">средняя оценка по группе:</p>
              <p class="block-list__average">{{group.averageRating}}</p>

              <ul class="block-list" v-if="group.visible">
                <li v-for="student of group.student" :key="student.index">{{student.name}}
                  <p class="block-list__average-student">{{student.studentRating}}</p></li>
              </ul>

            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import HeaderComponent from "@/components/unitComponents/headerComponent";
import PreloaderBlock from "@/components/unitComponents/preloaderBlock";
export default {
  name: "ResultPage",
  components: {PreloaderBlock, HeaderComponent},
  data() {
    return {
      dataUser: [],
      dataResult: [],
      showPreloader: true,
      testsResults: [
        {
          name: 'Тест 1',
          visible: false,
          group: [
            {
              title: 'Д-Э 121',
              visible: false,
              averageRating: '4.3',
              student: [
                {name: 'Иванов Сергей Сергеевич', studentRating: '5'},
                {name: 'Петров Сергей Сергеевич', studentRating: '4'},
                {name: 'Сидоров Сергей Сергеевич', studentRating: '3'},
                {name: 'Макеев Сергей Сергеевич', studentRating: '2'},
                {name: 'Овечкин Сергей Сергеевич', studentRating: '5'},
                {name: 'Лебовски Сергей Сергеевич', studentRating: '4'}
              ]
            },
            {
              title: 'Д-Э 122',
              visible: false,
              averageRating: '4.1',
              student: [
                {name: 'Иванов Сергей Сергеевич', studentRating: '5'},
                {name: 'Петров Сергей Сергеевич', studentRating: '4'},
                {name: 'Сидоров Сергей Сергеевич', studentRating: '3'},
                {name: 'Макеев Сергей Сергеевич', studentRating: '2'},
                {name: 'Овечкин Сергей Сергеевич', studentRating: '5'},
                {name: 'Лебовски Сергей Сергеевич', studentRating: '4'}
              ]
            },
            {
              title: 'Д-Э 123',
              visible: false,
              averageRating: '3.1',
              student: [
                {name: 'Иванов Сергей Сергееви', studentRating: '5'},
                {name: 'Петров Сергей Сергеевич', studentRating: '4'},
                {name: 'Сидоров Сергей Сергеевич', studentRating: '3'},
                {name: 'Макеев Сергей Сергеевич', studentRating: '2'},
                {name: 'Овечкин Сергей Сергеевич', studentRating: '5'},
                {name: 'Лебовски Сергей Сергеевич', studentRating: '4'}
              ]
            },
            {
              title: 'Д-Э 124',
              visible: false,
              averageRating: '4',
              student: [
                {name: 'Иванов Сергей Сергеевич', studentRating: '5'},
                {name: 'Петров Сергей Сергеевич', studentRating: '4'},
                {name: 'Сидоров Сергей Сергеевич', studentRating: '3'},
                {name: 'Макеев Сергей Сергеевич', studentRating: '2'},
                {name: 'Овечкин Сергей Сергеевич', studentRating: '5'},
                {name: 'Лебовски Сергей Сергеевич', studentRating: '4'}
              ]
            },
            {
              title: 'Д-Э 125',
              visible: false,
              averageRating: '2',
              student: [
                {name: 'Иванов Сергей Сергеевич', studentRating: '2'},
                {name: 'Петров Сергей Сергеевич', studentRating: '2'},
                {name: 'Сидоров Сергей Сергеевич', studentRating: '2'},
                {name: 'Макеев Сергей Сергеевич', studentRating: '2'},
                {name: 'Овечкин Сергей Сергеевич', studentRating: '2'},
                {name: 'Лебовски Сергей Сергеевич', studentRating: '2'}
              ]
            },
            {
              title: 'Д-Э 126',
              visible: false,
              averageRating: '3.8',
              student: [
                {name: 'Иванов Сергей Сергеевич', studentRating: '5'},
                {name: 'Петров Сергей Сергеевич', studentRating: '4'},
                {name: 'Сидоров Сергей Сергеевич', studentRating: '3'},
                {name: 'Макеев Сергей Сергеевич', studentRating: '2'},
                {name: 'Овечкин Сергей Сергеевич', studentRating: '5'},
                {name: 'Лебовски Сергей Сергеевич', studentRating: '4'}
              ]
            },
          ]
        },
        {
          name: 'Тест 2',
          visible: false,
          group: [
            {
              title: 'Д-Э 121',
              visible: false,
              averageRating: '4.3',
              student: [
                {name: 'Иванов Сергей Сергеевич', studentRating: '5'},
                {name: 'Петров Сергей Сергеевич', studentRating: '4'},
                {name: 'Сидоров Сергей Сергеевич', studentRating: '3'},
                {name: 'Макеев Сергей Сергеевич', studentRating: '2'},
                {name: 'Овечкин Сергей Сергеевич', studentRating: '5'},
                {name: 'Лебовски Сергей Сергеевич', studentRating: '4'}
              ]
            },
            {
              title: 'Д-Э 122',
              visible: false,
              averageRating: '4.1',
              student: [
                {name: 'Иванов Сергей Сергеевич', studentRating: '5'},
                {name: 'Петров Сергей Сергеевич', studentRating: '4'},
                {name: 'Сидоров Сергей Сергеевич', studentRating: '3'},
                {name: 'Макеев Сергей Сергеевич', studentRating: '2'},
                {name: 'Овечкин Сергей Сергеевич', studentRating: '5'},
                {name: 'Лебовски Сергей Сергеевич', studentRating: '4'}
              ]
            },
            {
              title: 'Д-Э 123',
              visible: false,
              averageRating: '3.1',
              student: [
                {name: 'Иванов Сергей Сергееви', studentRating: '5'},
                {name: 'Петров Сергей Сергеевич', studentRating: '4'},
                {name: 'Сидоров Сергей Сергеевич', studentRating: '3'},
                {name: 'Макеев Сергей Сергеевич', studentRating: '2'},
                {name: 'Овечкин Сергей Сергеевич', studentRating: '5'},
                {name: 'Лебовски Сергей Сергеевич', studentRating: '4'}
              ]
            },
            {
              title: 'Д-Э 124',
              visible: false,
              averageRating: '4',
              student: [
                {name: 'Иванов Сергей Сергеевич', studentRating: '5'},
                {name: 'Петров Сергей Сергеевич', studentRating: '4'},
                {name: 'Сидоров Сергей Сергеевич', studentRating: '3'},
                {name: 'Макеев Сергей Сергеевич', studentRating: '2'},
                {name: 'Овечкин Сергей Сергеевич', studentRating: '5'},
                {name: 'Лебовски Сергей Сергеевич', studentRating: '4'}
              ]
            },
            {
              title: 'Д-Э 125',
              visible: false,
              averageRating: '2',
              student: [
                {name: 'Иванов Сергей Сергеевич', studentRating: '2'},
                {name: 'Петров Сергей Сергеевич', studentRating: '2'},
                {name: 'Сидоров Сергей Сергеевич', studentRating: '2'},
                {name: 'Макеев Сергей Сергеевич', studentRating: '2'},
                {name: 'Овечкин Сергей Сергеевич', studentRating: '2'},
                {name: 'Лебовски Сергей Сергеевич', studentRating: '2'}
              ]
            },
            {
              title: 'Д-Э 126',
              visible: false,
              averageRating: '3.8',
              student: [
                {name: 'Иванов Сергей Сергеевич', studentRating: '5'},
                {name: 'Петров Сергей Сергеевич', studentRating: '4'},
                {name: 'Сидоров Сергей Сергеевич', studentRating: '3'},
                {name: 'Макеев Сергей Сергеевич', studentRating: '2'},
                {name: 'Овечкин Сергей Сергеевич', studentRating: '5'},
                {name: 'Лебовски Сергей Сергеевич', studentRating: '4'}
              ]
            },
          ]
        },
        {
          name: 'Тест 3',
          visible: false,
          group: [
            {
              title: 'Д-Э 121',
              visible: false,
              averageRating: '4.3',
              student: [
                {name: 'Иванов Сергей Сергеевич', studentRating: '5'},
                {name: 'Петров Сергей Сергеевич', studentRating: '4'},
                {name: 'Сидоров Сергей Сергеевич', studentRating: '3'},
                {name: 'Макеев Сергей Сергеевич', studentRating: '2'},
                {name: 'Овечкин Сергей Сергеевич', studentRating: '5'},
                {name: 'Лебовски Сергей Сергеевич', studentRating: '4'}
              ]
            },
            {
              title: 'Д-Э 122',
              visible: false,
              averageRating: '4.1',
              student: [
                {name: 'Иванов Сергей Сергеевич', studentRating: '5'},
                {name: 'Петров Сергей Сергеевич', studentRating: '4'},
                {name: 'Сидоров Сергей Сергеевич', studentRating: '3'},
                {name: 'Макеев Сергей Сергеевич', studentRating: '2'},
                {name: 'Овечкин Сергей Сергеевич', studentRating: '5'},
                {name: 'Лебовски Сергей Сергеевич', studentRating: '4'}
              ]
            },
            {
              title: 'Д-Э 123',
              visible: false,
              averageRating: '3.1',
              student: [
                {name: 'Иванов Сергей Сергееви', studentRating: '5'},
                {name: 'Петров Сергей Сергеевич', studentRating: '4'},
                {name: 'Сидоров Сергей Сергеевич', studentRating: '3'},
                {name: 'Макеев Сергей Сергеевич', studentRating: '2'},
                {name: 'Овечкин Сергей Сергеевич', studentRating: '5'},
                {name: 'Лебовски Сергей Сергеевич', studentRating: '4'}
              ]
            },
            {
              title: 'Д-Э 124',
              visible: false,
              averageRating: '4',
              student: [
                {name: 'Иванов Сергей Сергеевич', studentRating: '5'},
                {name: 'Петров Сергей Сергеевич', studentRating: '4'},
                {name: 'Сидоров Сергей Сергеевич', studentRating: '3'},
                {name: 'Макеев Сергей Сергеевич', studentRating: '2'},
                {name: 'Овечкин Сергей Сергеевич', studentRating: '5'},
                {name: 'Лебовски Сергей Сергеевич', studentRating: '4'}
              ]
            },
            {
              title: 'Д-Э 125',
              visible: false,
              averageRating: '2',
              student: [
                {name: 'Иванов Сергей Сергеевич', studentRating: '2'},
                {name: 'Петров Сергей Сергеевич', studentRating: '2'},
                {name: 'Сидоров Сергей Сергеевич', studentRating: '2'},
                {name: 'Макеев Сергей Сергеевич', studentRating: '2'},
                {name: 'Овечкин Сергей Сергеевич', studentRating: '2'},
                {name: 'Лебовски Сергей Сергеевич', studentRating: '2'}
              ]
            },
            {
              title: 'Д-Э 126',
              visible: false,
              averageRating: '3.8',
              student: [
                {name: 'Иванов Сергей Сергеевич', studentRating: '5'},
                {name: 'Петров Сергей Сергеевич', studentRating: '4'},
                {name: 'Сидоров Сергей Сергеевич', studentRating: '3'},
                {name: 'Макеев Сергей Сергеевич', studentRating: '2'},
                {name: 'Овечкин Сергей Сергеевич', studentRating: '5'},
                {name: 'Лебовски Сергей Сергеевич', studentRating: '4'}
              ]
            },
          ]
        },
        {
          name: 'Тест 4',
          visible: false,
          group: [
            {
              title: 'Д-Э 121',
              visible: false,
              averageRating: '4.3',
              student: [
                {name: 'Иванов Сергей Сергеевич', studentRating: '5'},
                {name: 'Петров Сергей Сергеевич', studentRating: '4'},
                {name: 'Сидоров Сергей Сергеевич', studentRating: '3'},
                {name: 'Макеев Сергей Сергеевич', studentRating: '2'},
                {name: 'Овечкин Сергей Сергеевич', studentRating: '5'},
                {name: 'Лебовски Сергей Сергеевич', studentRating: '4'}
              ]
            },
            {
              title: 'Д-Э 122',
              visible: false,
              averageRating: '4.1',
              student: [
                {name: 'Иванов Сергей Сергеевич', studentRating: '5'},
                {name: 'Петров Сергей Сергеевич', studentRating: '4'},
                {name: 'Сидоров Сергей Сергеевич', studentRating: '3'},
                {name: 'Макеев Сергей Сергеевич', studentRating: '2'},
                {name: 'Овечкин Сергей Сергеевич', studentRating: '5'},
                {name: 'Лебовски Сергей Сергеевич', studentRating: '4'}
              ]
            },
            {
              title: 'Д-Э 123',
              visible: false,
              averageRating: '3.1',
              student: [
                {name: 'Иванов Сергей Сергееви', studentRating: '5'},
                {name: 'Петров Сергей Сергеевич', studentRating: '4'},
                {name: 'Сидоров Сергей Сергеевич', studentRating: '3'},
                {name: 'Макеев Сергей Сергеевич', studentRating: '2'},
                {name: 'Овечкин Сергей Сергеевич', studentRating: '5'},
                {name: 'Лебовски Сергей Сергеевич', studentRating: '4'}
              ]
            },
            {
              title: 'Д-Э 124',
              visible: false,
              averageRating: '4',
              student: [
                {name: 'Иванов Сергей Сергеевич', studentRating: '5'},
                {name: 'Петров Сергей Сергеевич', studentRating: '4'},
                {name: 'Сидоров Сергей Сергеевич', studentRating: '3'},
                {name: 'Макеев Сергей Сергеевич', studentRating: '2'},
                {name: 'Овечкин Сергей Сергеевич', studentRating: '5'},
                {name: 'Лебовски Сергей Сергеевич', studentRating: '4'}
              ]
            },
            {
              title: 'Д-Э 125',
              visible: false,
              averageRating: '2',
              student: [
                {name: 'Иванов Сергей Сергеевич', studentRating: '2'},
                {name: 'Петров Сергей Сергеевич', studentRating: '2'},
                {name: 'Сидоров Сергей Сергеевич', studentRating: '2'},
                {name: 'Макеев Сергей Сергеевич', studentRating: '2'},
                {name: 'Овечкин Сергей Сергеевич', studentRating: '2'},
                {name: 'Лебовски Сергей Сергеевич', studentRating: '2'}
              ]
            },
            {
              title: 'Д-Э 126',
              visible: false,
              averageRating: '3.8',
              student: [
                {name: 'Иванов Сергей Сергеевич', studentRating: '5'},
                {name: 'Петров Сергей Сергеевич', studentRating: '4'},
                {name: 'Сидоров Сергей Сергеевич', studentRating: '3'},
                {name: 'Макеев Сергей Сергеевич', studentRating: '2'},
                {name: 'Овечкин Сергей Сергеевич', studentRating: '5'},
                {name: 'Лебовски Сергей Сергеевич', studentRating: '4'}
              ]
            },
          ]
        },
        {
          name: 'Тест 5',
          visible: false,
          group: [
            {
              title: 'Д-Э 121',
              visible: false,
              averageRating: '4.3',
              student: [
                {name: 'Иванов Сергей Сергеевич', studentRating: '5'},
                {name: 'Петров Сергей Сергеевич', studentRating: '4'},
                {name: 'Сидоров Сергей Сергеевич', studentRating: '3'},
                {name: 'Макеев Сергей Сергеевич', studentRating: '2'},
                {name: 'Овечкин Сергей Сергеевич', studentRating: '5'},
                {name: 'Лебовски Сергей Сергеевич', studentRating: '4'}
              ]
            },
            {
              title: 'Д-Э 122',
              visible: false,
              averageRating: '4.1',
              student: [
                {name: 'Иванов Сергей Сергеевич', studentRating: '5'},
                {name: 'Петров Сергей Сергеевич', studentRating: '4'},
                {name: 'Сидоров Сергей Сергеевич', studentRating: '3'},
                {name: 'Макеев Сергей Сергеевич', studentRating: '2'},
                {name: 'Овечкин Сергей Сергеевич', studentRating: '5'},
                {name: 'Лебовски Сергей Сергеевич', studentRating: '4'}
              ]
            },
            {
              title: 'Д-Э 123',
              visible: false,
              averageRating: '3.1',
              student: [
                {name: 'Иванов Сергей Сергееви', studentRating: '5'},
                {name: 'Петров Сергей Сергеевич', studentRating: '4'},
                {name: 'Сидоров Сергей Сергеевич', studentRating: '3'},
                {name: 'Макеев Сергей Сергеевич', studentRating: '2'},
                {name: 'Овечкин Сергей Сергеевич', studentRating: '5'},
                {name: 'Лебовски Сергей Сергеевич', studentRating: '4'}
              ]
            },
            {
              title: 'Д-Э 124',
              visible: false,
              averageRating: '4',
              student: [
                {name: 'Иванов Сергей Сергеевич', studentRating: '5'},
                {name: 'Петров Сергей Сергеевич', studentRating: '4'},
                {name: 'Сидоров Сергей Сергеевич', studentRating: '3'},
                {name: 'Макеев Сергей Сергеевич', studentRating: '2'},
                {name: 'Овечкин Сергей Сергеевич', studentRating: '5'},
                {name: 'Лебовски Сергей Сергеевич', studentRating: '4'}
              ]
            },
            {
              title: 'Д-Э 125',
              visible: false,
              averageRating: '2',
              student: [
                {name: 'Иванов Сергей Сергеевич', studentRating: '2'},
                {name: 'Петров Сергей Сергеевич', studentRating: '2'},
                {name: 'Сидоров Сергей Сергеевич', studentRating: '2'},
                {name: 'Макеев Сергей Сергеевич', studentRating: '2'},
                {name: 'Овечкин Сергей Сергеевич', studentRating: '2'},
                {name: 'Лебовски Сергей Сергеевич', studentRating: '2'}
              ]
            },
            {
              title: 'Д-Э 126',
              visible: false,
              averageRating: '3.8',
              student: [
                {name: 'Иванов Сергей Сергеевич', studentRating: '5'},
                {name: 'Петров Сергей Сергеевич', studentRating: '4'},
                {name: 'Сидоров Сергей Сергеевич', studentRating: '3'},
                {name: 'Макеев Сергей Сергеевич', studentRating: '2'},
                {name: 'Овечкин Сергей Сергеевич', studentRating: '5'},
                {name: 'Лебовски Сергей Сергеевич', studentRating: '4'}
              ]
            },
          ]
        },
        {
          name: 'Тест 6',
          visible: false,
          group: [
            {
              title: 'Д-Э 121',
              visible: false,
              averageRating: '4.3',
              student: [
                {name: 'Иванов Сергей Сергеевич', studentRating: '5'},
                {name: 'Петров Сергей Сергеевич', studentRating: '4'},
                {name: 'Сидоров Сергей Сергеевич', studentRating: '3'},
                {name: 'Макеев Сергей Сергеевич', studentRating: '2'},
                {name: 'Овечкин Сергей Сергеевич', studentRating: '5'},
                {name: 'Лебовски Сергей Сергеевич', studentRating: '4'}
              ]
            },
            {
              title: 'Д-Э 122',
              visible: false,
              averageRating: '4.1',
              student: [
                {name: 'Иванов Сергей Сергеевич', studentRating: '5'},
                {name: 'Петров Сергей Сергеевич', studentRating: '4'},
                {name: 'Сидоров Сергей Сергеевич', studentRating: '3'},
                {name: 'Макеев Сергей Сергеевич', studentRating: '2'},
                {name: 'Овечкин Сергей Сергеевич', studentRating: '5'},
                {name: 'Лебовски Сергей Сергеевич', studentRating: '4'}
              ]
            },
            {
              title: 'Д-Э 123',
              visible: false,
              averageRating: '3.1',
              student: [
                {name: 'Иванов Сергей Сергееви', studentRating: '5'},
                {name: 'Петров Сергей Сергеевич', studentRating: '4'},
                {name: 'Сидоров Сергей Сергеевич', studentRating: '3'},
                {name: 'Макеев Сергей Сергеевич', studentRating: '2'},
                {name: 'Овечкин Сергей Сергеевич', studentRating: '5'},
                {name: 'Лебовски Сергей Сергеевич', studentRating: '4'}
              ]
            },
            {
              title: 'Д-Э 124',
              visible: false,
              averageRating: '4',
              student: [
                {name: 'Иванов Сергей Сергеевич', studentRating: '5'},
                {name: 'Петров Сергей Сергеевич', studentRating: '4'},
                {name: 'Сидоров Сергей Сергеевич', studentRating: '3'},
                {name: 'Макеев Сергей Сергеевич', studentRating: '2'},
                {name: 'Овечкин Сергей Сергеевич', studentRating: '5'},
                {name: 'Лебовски Сергей Сергеевич', studentRating: '4'}
              ]
            },
            {
              title: 'Д-Э 125',
              visible: false,
              averageRating: '2',
              student: [
                {name: 'Иванов Сергей Сергеевич', studentRating: '2'},
                {name: 'Петров Сергей Сергеевич', studentRating: '2'},
                {name: 'Сидоров Сергей Сергеевич', studentRating: '2'},
                {name: 'Макеев Сергей Сергеевич', studentRating: '2'},
                {name: 'Овечкин Сергей Сергеевич', studentRating: '2'},
                {name: 'Лебовски Сергей Сергеевич', studentRating: '2'}
              ]
            },
            {
              title: 'Д-Э 126',
              visible: false,
              averageRating: '3.8',
              student: [
                {name: 'Иванов Сергей Сергеевич', studentRating: '5'},
                {name: 'Петров Сергей Сергеевич', studentRating: '4'},
                {name: 'Сидоров Сергей Сергеевич', studentRating: '3'},
                {name: 'Макеев Сергей Сергеевич', studentRating: '2'},
                {name: 'Овечкин Сергей Сергеевич', studentRating: '5'},
                {name: 'Лебовски Сергей Сергеевич', studentRating: '4'}
              ]
            },
          ]
        }
      ]
    }
  },
  methods: {
    closePreloder() {
      setTimeout(() => (
          this.showPreloader = false
      ), 700);
    },
    showGroup(item) {
      if (item.visible === false) {
        return item.visible = true
      }
      if (item.visible === true) {
        return item.visible = false
      }
    },
    showList(group) {
      if (group.visible === false) {
        return group.visible = true
      }
      if (group.visible === true) {
        return group.visible = false
      }
    }
  },
  async created() {
    // получаем sessionId из localStorage
    this.sessionId = JSON.parse(localStorage.getItem('sessionId'))
    // получаем данные о пользователе
    await fetch(`auth/sessionId?sessionId=${this.sessionId}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
    })
        .then(response => response.json())
        .then(data => {
          this.dataUser = data; console.log(this.dataUser.id)
        });
    // Получаем данные результатов
    await fetch(`/result/teacherId?teacherId=${this.dataUser.id}&sessionId=${this.sessionId}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    })
        .then(response => response.json())
        .then(data => {
           this.dataResult = data; console.log(this.dataResult)
        });

  },
  mounted() {
    this.closePreloder()
  },
}
</script>

<style scoped>
.container-allResult{
  padding: 0 80px;
}
h1{
  font-weight: 600;
  font-size: 28px;
  line-height: 44px;
  color: #26AF11;
  margin: 38px 0;
}
ul{
  height: inherit;
  padding: 0;
  text-align: left;
}
li{
  list-style-type: none;
  font-weight: 600;
  font-size: 22px;
  line-height: 31px;
  color: #49485E;
  margin-bottom: 16px;
  position: relative;
}
i {
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  margin: 7px;
}
.down {
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}
.block-group{
  margin: 0 0 0 40%;
  cursor: pointer;
}
.block-list{
  margin-left: 40px;
  cursor: default;
  width: 100%;
}
.up {
  transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
  margin: 3px 3px 3px 8px;
}
.block-i{
  position: absolute;
  top: 2px;
  padding-left: 88px;
  cursor: pointer;
}
.block-list__text{
  font-weight: 600;
  font-size: 22px;
  line-height: 31px;
  color: #49485E;
  margin: -4px 0 0 72px;
}
.block-list__average-student,
.block-list__average{
  font-weight: 600;
  font-size: 22px;
  line-height: 31px;
  color: #26AF11;
}
.block-list__average{
  margin: -4px 0 0 25px;
}
.block-list__average-student{
  margin: 0 0 0 25px;
}
.block-list li{
  display: flex;
  flex-wrap: wrap;
}
</style>
