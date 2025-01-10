import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngxs/store';
import { UpdateUsername } from '../actions/user.actions';
import { ApiService } from '../api.service';
import { RouterLink, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { UserState } from '../states/user.states';

@Component({
  selector: 'app-authentication',
  imports: [CommonModule, RouterModule, FormsModule, RouterLink],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css'
})
export class AuthenticationComponent implements OnInit {
    email = '';
    password = '';
    username = '';
    isRegisterMode = false;
    isAuthenticated = false; // Track authentication state
    displayUsername$: Observable<string>;

    ngOnInit(): void {
        // Check if the user is already authenticated
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        if (accessToken && refreshToken) {
            this.apiService.getCurrentUser().subscribe(
                (user: any) => {
                    this.isAuthenticated = true;
                    this.store.dispatch(new UpdateUsername(user.username));
                },
                (error) => {
                    console.error('Error loading user info:', error)
                }
            );
        }
    }

    constructor(private apiService: ApiService, private store: Store) {
        this.displayUsername$ = this.store.select(UserState.getUsername);
    }

    toggleMode() {
        this.isRegisterMode = !this.isRegisterMode;
    }

    authenticate() {
        if (this.isRegisterMode) {
            this.apiService.register(this.email, this.username, this.password).subscribe(
                (response) => {
                    console.log('Registered:', response);
                    alert('Registration successful! Please log in.');
                    this.toggleMode();
                },
                (error) => console.error('Error:', error)
            );
        }
        else {
            this.apiService.login(this.email, this.password).subscribe(
                (response: any) => {
                    console.log('Logged in:', response);
                    this.isAuthenticated = true;
                    console.log('User username:', response.username);
                    this.store.dispatch(new UpdateUsername(response.username));
                    // put the access token in the local storage
                    localStorage.setItem('accessToken', response.tokens.accessToken);
                    localStorage.setItem('refreshToken', response.tokens.refreshToken);
                },
                (error) => {
                    console.error('Error:', error);
                    switch (error.status) {
                        case 401:
                            alert('Email or password incorrect');
                            break;
                        default:
                            alert('An error occurred, probably a charly error');
                    }
                }
            );
        }
    }

    logout() {
        this.isAuthenticated = false;
        this.email = '';
        this.password = '';
        this.username = '';
        this.store.dispatch(new UpdateUsername(''));
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        alert('You have been logged out.');
    }
}
