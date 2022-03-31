<template>
  <div>
        <b-container>
            <b-row>
                <b-col>
                    <b-form-input v-model="title" placeholder="Title"></b-form-input>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-form-textarea
                        id="textarea"
                        v-model="content"
                        placeholder="Enter something..."
                        rows="3"
                        max-rows="6"
                    ></b-form-textarea>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <label for="start-date">วันเริ่มต้น</label>
                    <b-form-datepicker id="start-date" v-model="startDate" class="mb-2" locale="th"></b-form-datepicker>
                </b-col>
                <b-col>
                    <label for="start-time">เวลาเริ่มต้น</label>
                    <b-form-timepicker id="start-time" v-model="startTime" locale="th"></b-form-timepicker>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <label for="end-date">วันสิ้นสุด</label>
                    <b-form-datepicker id="end-date" v-model="endDate" class="mb-2" locale="th"></b-form-datepicker>
                </b-col>
                <b-col>
                    <label for="end-time">เวลาสิ้นสุด</label>
                    <b-form-timepicker id="end-time" v-model="endTime" locale="th"></b-form-timepicker>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-button @click="addEvent">Add Event</b-button>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <vue-cal :locale="th" today-button active-view="week" :events="events" 
                    @ready="ready($event)"
                    @view-change="viewChange( $event)"/>
                </b-col>
            </b-row>
        </b-container>
  </div>
</template>

<script>
import th from '../locales/th'
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import api from '../services/api'
import { getEvents } from '../services/event'
export default {
  data() {
    return {
        title: '',
        content: '',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        events: [
            {
                start: '2022-03-31 20:00',
                end: '2022-03-31 22:00',
                title: 'เขียนโค้ด',
                content: 'นั่งกัดฟันเขียนโค้ดให้แฟน',
                class: 'tanny'
            }
        ]
    }
  },
  methods: {
    mapEvents (res){
        return res.data.map(function(event){
            return {
                title: event.title,
                content: event.content,
                start: new Date(event.startDate),
                end: new Date(event.endDate),
                class: event.class
            }
        })
    },
    async ready(e){
        const res = await getEvents(e.startDate, e.endDate)

        const newEvents = this.mapEvents(res)

        console.log('ready',newEvents)
        this.events = newEvents
    },
    async viewChange(e){
        const res = await getEvents(e.startDate, e.endDate)
        
        const newEvents = this.mapEvents(res)
        
        console.log('view-change', newEvents)
        this.events = newEvents
    },
    addEvent(){
        const event = {
            title: this.title,
            content: this.content,
            start: new Date(`${this.startDate} ${this.startTime}`),
            end: new Date(`${this.endDate} ${this.endTime}`),
            class: 'tanny'
        }
        console.log(event) // debug it
        this.events.push(event)
    }
  },
  computed: {
    th() {
      return th
    }
  },
  components: {
    VueCal
  }
}
</script>

<style>
.vuecal__now-line {
  color: #06c;
}
.vuecal__event.tanny {
  background-color: rgba(255, 102, 102, 0.9);
  border: 1px solid rgb(235, 82, 82);
  color: #fff;
}
</style>
