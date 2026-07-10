// ASYNC REVIEW
// function getUser() {
//   return { id: 1, email: 'a' };
// }
// getUser();

import { filter, map, Observable, tap } from 'rxjs';

// async function getUser1() {
//   console.log('ASYNC USER1');
//   return 'user1';
// }

// await getUser1();

// Promise
// const promise = new Promise((resolve) => {
//   console.log('promise run');
//   resolve('a'); // only single value
// });

// promise.then((data) => console.log(data));

// Observable
const observable = new Observable((subsciber) => {
  // console.log('observable run');
  // subsciber.next(1);
  // subsciber.next(2);
  // subsciber.next(3);
  // emit multiple value
  subsciber.next({ access_token: 'zzxxx' });
  subsciber.complete();
});

// observable.subscribe((data) => console.log(data));
observable
  .pipe(
    map((data) => (data as number) * 6),
    filter((data) => data > 10),
    tap((data) => console.log(data))
  )
  .subscribe((data) => console.log(data));

// controller return { access_token: 'zzxxx' }
// interceptor => Observable<{ access_token: string }> ==> of({ access_token: 'zzxxx' })
// next.handle() ==> Observable ==> return from interceptor ==> Observable
// Observable.subscibe ==> response
// WEB SOCKET interceptor can emit multiple value
// HTTP SERVER incerceptor emit only one response

// CACHE, TRANSFORM RESPONSE, LOGGING, FILE INTERCEPTOR(THIRD PARTY)
// REGISTER ==> { message: '' }
// LOGIN ==>  { access_token: 'aaa'  }
// GETME ===> { id, email,  role }

// RESPONSE { success: true, data: { id, email,  role }, path: '/auth/me', timestamp: 2026-07-10T15:14:15, meta: { page: 2, total: 79, perPage: 50 }  }
