/**
 * Created by huk on 2019/8/9.
 */

let sum = 0;
for ( let i = 0; i < 10000; i++ ) {
    sum += i;
}

self.postMessage(sum);