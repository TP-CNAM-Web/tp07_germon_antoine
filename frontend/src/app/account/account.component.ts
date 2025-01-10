import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserState } from '../states/user.states';
import { UpdateUsername } from '../actions/user.actions';
import { Store } from '@ngxs/store';

@Component({
    selector: 'app-account',
    imports: [CommonModule, FormsModule],
    templateUrl: './account.component.html',
    styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {
    email = '';
    username = '';
    isEditing = false;

    constructor(private apiService: ApiService, private store: Store) {}


    ngOnInit(): void {
        this.loadUserInfo();
    }

    loadUserInfo() {
        // Fetch user info (mocked or real, replace with actual API call)
        this.apiService.getCurrentUser().subscribe(
            (user: any) => {
                this.email = user.email;
                this.username = user.username;
            },
            (error) => console.error('Error loading user info:', error)
        );
    }

    saveChanges() {
        const updatedUser = { email: this.email, username: this.username };
        this.apiService.updateUser(updatedUser).subscribe(
            (response) => {
                console.log('User updated successfully:', response);
                alert('User information updated!');
                this.isEditing = false;
                this.store.dispatch(new UpdateUsername(this.username));
            },
            (error) => console.error('Error updating user info:', error)
        );
    }

    toggleEdit() {
        this.isEditing = !this.isEditing;
    }
}
