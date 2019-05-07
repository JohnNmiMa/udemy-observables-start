import {Component, OnInit, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/Rx';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
    numbersObsSubscription: Subscription;
    customObsSubscription: Subscription;

    constructor() {
    }

    ngOnInit() {
        // interval is an Rxjs observable utility function.
        // const myNumbers = Observable.interval(1000);
        const myNumbers = Observable.interval(1000)
            .map(
                // the observable 'map' operator. Operators can be used on any observable.
                // Observable operators return an new Observables.
                (data: number) => {
                    return data * 2;
                }
            );
        this.numbersObsSubscription = myNumbers.subscribe(
            (number: number) => {
                console.log(number);
            }
        );

        // Creating an observable

        // This is an observable, with two data packages and one error function.
        const myObservable = Observable.create((observer: Observer<string>) => {
            setTimeout(() => {
                observer.next('first package');
            }, 2000);
            setTimeout(() => {
                observer.next('second package');
            }, 4000);
            setTimeout(() => {
                // observer.error('this does not work');
                observer.complete();
            }, 5000);
            setTimeout(() => {
                // This data package will never get called if there was an error or the
                // observable is completed.
                observer.next('third package');
            }, 7000);
        });

        // This shows using (subscribing) to our custom observable.
        this.customObsSubscription = myObservable.subscribe(
            (data: string) => {
                console.log('data package = ' + data);
            },
            (error: string) => {
                console.log('observable error = ' + error);
            },
            () => {
                console.log('completed');
            }
        );
    }

    ngOnDestroy() {
        // These are necessary, and will keep running without the unscribing.
        this.numbersObsSubscription.unsubscribe();
        this.customObsSubscription.unsubscribe();
    }
}
