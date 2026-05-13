<template>
  <div class="container-fluid">
    <div class="row page-titles">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="javascript:void(0)">App</a></li>
        <li class="breadcrumb-item active"><a href="javascript:void(0)">Calendar</a></li>
      </ol>
    </div>
    <div class="row">
      <div class="col-xl-3 col-xxl-4">
        <div class="card">
          <div class="card-body">
            <h4 class="card-intro-title">Calendar</h4>
            <div class="">
              <div id="external-events" class="my-3">
                <p>Drag and drop your event or click in the calendar</p>
                <VueDraggableNext item-key="external-event">
                  <div class="external-event btn-primary light" data-class="bg-primary"><i class="fa fa-move"></i><span>New Theme Release</span></div>
                  <div class="external-event btn-warning light" data-class="bg-warning"><i class="fa fa-move"></i>My Event</div>
                  <div class="external-event btn-danger light" data-class="bg-danger"><i class="fa fa-move"></i>Meet manager</div>
                  <div class="external-event btn-info light" data-class="bg-info"><i class="fa fa-move"></i>Create New theme</div>
                  <div class="external-event btn-dark light" data-class="bg-dark"><i class="fa fa-move"></i>Project Launch</div>
                  <div class="external-event btn-secondary light" data-class="bg-secondary"><i class="fa fa-move"></i>Meeting</div>
                </VueDraggableNext>
              </div>
              <div class="checkbox form-check checkbox-event custom-checkbox pt-3 pb-5">
                <input type="checkbox" class="form-check-input" id="drop-remove" />
                <label class="form-check-label" for="drop-remove">Remove After Drop</label>
              </div>
              <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#add-category" class="btn btn-primary btn-event w-100">
                <span class="align-middle"><i class="ti-plus me-2"></i></span> Create New
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-9 col-xxl-8">
        <div class="card">
          <div class="card-body">
            <div id="calendar" class="app-fullcalendar">
              <FullCalendar :options="calendarOptions" />
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade none-border" id="event-modal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title"><strong>Add New Event</strong></h4>
            </div>
            <div class="modal-body"></div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default waves-effect" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-success save-event waves-effect waves-light">Create event</button>
              <button type="button" class="btn btn-danger delete-event waves-effect waves-light" data-bs-toggle="modal">Delete</button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade none-border" id="add-category">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title"><strong>Add a category</strong></h4>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="row">
                  <div class="col-md-6">
                    <label class="control-label form-label">Category Name</label>
                    <input class="form-control form-white" placeholder="Category Name" type="text" name="category-name" />
                  </div>
                  <div class="col-md-6">
                    <label class="control-label form-label">Choose Category Color</label>
                    <select class="form-control default-select form-white" data-placeholder="Choose a color..." name="category-color">
                      <option value="success">Success</option>
                      <option value="danger">Danger</option>
                      <option value="info">Info</option>
                      <option value="pink">Pink</option>
                      <option value="primary">Primary</option>
                      <option value="warning">Warning</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger light waves-effect" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary waves-effect waves-light save-category" data-bs-toggle="modal">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// @ts-nocheck
import { defineComponent } from "vue";
import "@fullcalendar/core";
import FullCalendar, { CalendarOptions, EventApi, DateSelectArg, EventClickArg } from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { VueDraggableNext } from "vue-draggable-next";

export default defineComponent({
  name: "calender_",
  components: {
    FullCalendar,
    VueDraggableNext,
  },
  data() {
    return {
      calendarOptions: {
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin, // needed for dateClick
        ],
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        },
        initialView: "dayGridMonth",
        initialEvents: "INITIAL_EVENTS", // alternatively, use the `events` setting to fetch from a feed
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
      } as CalendarOptions,
      currentEvents: [] as EventApi[],
    };
  },
  methods: {
    handleWeekendsToggle() {
      this.calendarOptions.weekends = !this.calendarOptions.weekends; // update a property
    },
    handleDateSelect(selectInfo: DateSelectArg) {
      let title = prompt("Please enter a new title for your event");
      let calendarApi = selectInfo.view.calendar;

      calendarApi.unselect(); // clear date selection

      if (title) {
        calendarApi.addEvent({
          id: createEventId(),
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay,
        });
      }
    },
    handleEventClick(clickInfo: EventClickArg) {
      if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
        clickInfo.event.remove();
      }
    },
    handleEvents(events: EventApi[]) {
      this.currentEvents = events;
    },
  },
});
</script>

<style scoped></style>
