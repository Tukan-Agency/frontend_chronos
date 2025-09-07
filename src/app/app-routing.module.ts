import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ConstantsService } from './shared/constants.service';
import { ValidarTokenGuard } from './guards/validar-token.guard';

const routes: Routes = [
    { path: 'auth', loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule )},
    { path: 'dashboard', 
      loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardModule ),
      canActivate: [ ValidarTokenGuard ],
      canLoad: [ ValidarTokenGuard ]
    },
    { path: '**', redirectTo: 'auth'}
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {}