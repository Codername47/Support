import { Controller } from '@hotwired/stimulus';

import $ from 'jquery'

import axios from "axios";

export default class extends Controller {
    static targets = [ "form", "name", "password" ];

    connect() {
        $(this.formTarget).on("submit", (e) => {
            e.preventDefault();
            let username = this.nameTarget.value;
            let password = this.passwordTarget.value;
            axios.post('/auth', {
                username: username,
                password: password
            }).then(function (response) {
                console.log(response);
            })
                .catch(function (error) {
                    console.log(error);
                });

        })
    }
}