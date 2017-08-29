import {Controller, Body, Get, Post} from 'routing-controllers';
import * as request from 'request';
import {IncomingMessage as IM} from 'http';
import {IncomingMessage} from '../models/incoming.model';
import {OutcomingMessage, ResponseType} from '../models/outcoming.model';

@Controller('/')
export class SlackController {

    @Post('')
    post(@Body() message: IncomingMessage): any {

        if(message.channel_name === 'directmessage') {
            return 'I can\'t be anonymous here!';
        }

        const options: request.Options = {
            url: message.response_url,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            form: OutcomingMessage.inChannel(message.text).json()
        };

        request.post(message.response_url, options);

        return '';
    }

    @Get('')
    get(@Body() m:any): any {
      return m;
    }
}
