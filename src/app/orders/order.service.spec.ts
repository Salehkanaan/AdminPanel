import { TestBed } from '@angular/core/testing';
import { OrderService } from './order.service';
import { IonicModule } from '@ionic/angular';

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations:[OrderService],
      imports: [IonicModule.forRoot() ],
    });
    service = TestBed.inject(OrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
