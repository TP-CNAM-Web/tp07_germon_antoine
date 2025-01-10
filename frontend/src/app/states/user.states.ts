import { State, Action, StateContext, Selector } from '@ngxs/store';
import { UpdateUsername } from '../actions/user.actions';
import { Injectable } from '@angular/core';

export class UserStateModel {
    username: string = 'not connected';
}

@State<UserStateModel>({
    name: 'user',
    defaults: {
        username: 'not connected',
    },
})
@Injectable()
export class UserState {
    
    @Selector()
    static getUsername(state: UserStateModel) {
        return state.username;
    }

    @Action(UpdateUsername)
    updateUsername({ patchState }: StateContext<UserStateModel>, { payload }: any) {
        patchState({ username: payload });
    }
}