export class UpdateUsername {
    static readonly type = '[User] Update Username';
    constructor(public payload: string) {}
}