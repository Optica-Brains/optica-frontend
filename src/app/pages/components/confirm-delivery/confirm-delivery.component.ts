import { Batch } from './../../../models/batch.model';
import { BatchesService } from './../../../services/batches/batches.service';
import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-confirm-delivery',
  templateUrl: './confirm-delivery.component.html',
  styleUrls: ['./confirm-delivery.component.css']
})
export class ConfirmDeliveryComponent implements OnInit {

  @Input() date?: string | Date;

  @ViewChild('closebutton') closebutton!: ElementRef;

  @Input() batch!: Batch;
  @Input() batchId!: number;
  @Input() loading!: boolean;

  @Output() updateBatchesEvent = new EventEmitter();

  public error: string = '';

  constructor(private batchService: BatchesService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    if (changes['batch'].currentValue) {
      if (typeof this.batch.rider_delivery_time === 'string') {
        const isoString = new Date(this.batch.rider_delivery_time).toISOString()
        this.date = isoString.substring(0, isoString.length - 1)
      }
    }
  }

  confrimDelivery() {
    if (this.date) {
      this.batchService.managerDeliverConfirm(this.batch.id, this.date.toString())
        .subscribe(data => {
          this.closeModal()
          this.updateBatchesEvent.emit()
        })
    }
  }

  closeModal() {
    this.closebutton.nativeElement.click();
  }

}
