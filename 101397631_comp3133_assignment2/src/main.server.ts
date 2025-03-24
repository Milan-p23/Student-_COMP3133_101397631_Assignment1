import 'zone.js/node';
import express from 'express';
import { join } from 'path';
import { existsSync } from 'fs';
import { APP_BASE_HREF } from '@angular/common';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { provideServerRendering } from '@angular/platform-server';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

export const app = express();

const distFolder = join(process.cwd(), 'dist/101397631_comp3133_assignment2/browser');
const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

// Setup the rendering engine
app.engine('html', (_, options, callback) => {
  bootstrapApplication(AppComponent, {
    ...config,
    providers: [provideServerRendering()],
  })
    .then((appRef) => {
      const engine = ngExpressEngine({ bootstrap: () => Promise.resolve(appRef) });
      engine(_, options, callback);
    })
    .catch(err => callback(err));
});

app.set('view engine', 'html');
app.set('views', distFolder);

// Static files
app.get('*.*', express.static(distFolder, {
  maxAge: '1y',
}));

// All regular routes
app.get('*', (req, res) => {
  res.render(indexHtml, {
    req,
    providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }]
  });
});
