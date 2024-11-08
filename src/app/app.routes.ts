import { Routes } from '@angular/router';
import { InfoComponent } from './info/info.component';
import { BodyComponent } from './body/body.component'
import { WorkComponent } from './work/work.component';


export const routes: Routes = [
    {
        path: 'info',
        component: InfoComponent,
    },
    {
        path: '',
        component: WorkComponent,
    }
];
