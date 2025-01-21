import { State, Action, StateContext, Selector } from '@ngxs/store';
import { UpdateUsername } from '../actions/user.actions';
import { Injectable } from '@angular/core';

export class UserStateModel {
    login: string = 'not connected';
}

@State<UserStateModel>({
    name: 'user',
    defaults: {
        login: 'not connected',
    },
})
@Injectable()
export class UserState {
    
    @Selector()
    static getUsername(state: UserStateModel) {
        return state.login;
    }

    @Action(UpdateUsername)
    updateUsername({ patchState }: StateContext<UserStateModel>, { payload }: any) {
        patchState({ login: payload });
    }
}