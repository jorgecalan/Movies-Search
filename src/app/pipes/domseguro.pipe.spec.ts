import { DomseguroPipe } from './domseguro.pipe';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

describe('DomseguroPipe', () => {
  let pipe: DomseguroPipe;

  const mockSanitizer = {
    bypassSecurityTrustResourceUrl: (url: string): SafeResourceUrl => url as SafeResourceUrl
  } as DomSanitizer;

  beforeEach(() => {
    pipe = new DomseguroPipe(mockSanitizer);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform a value correctly', () => {
    const value = 'spotify:track:6rqhFgbbKwnb9MLmUQDhG6';
    expect(pipe.transform(value)).toBeTruthy();
  });
});

