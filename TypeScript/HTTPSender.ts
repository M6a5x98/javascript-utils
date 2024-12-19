type RequestOptions = {
  headers?: Record<string, string>;
  type?: XMLHttpRequestResponseType;
};
type PostRequestOptions = {
  headers?: Record<string, string>;
  type?: XMLHttpRequestResponseType;
  body?: XMLBodyType;
};

type XMLResponseType = object | string | ArrayBuffer | Blob | Document | null;
type XMLBodyType = Document | XMLHttpRequestBodyInit | null;

class HTTPSender {
  constructor() {}
  public async get(
    url: string,
    Options: RequestOptions
  ): Promise<XMLResponseType> {
    return new Promise((resolve, reject) => {
      if (typeof url !== "string")
        reject("String expected for url arg, received " + typeof url);
      const options = Options ?? {};
      const type = (options.type ?? "text") as XMLHttpRequestResponseType;
      const headers = options.headers ?? {};
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      Object.keys(headers).forEach((header) => {
        xhr.setRequestHeader(header, headers[header]);
      });
      xhr.responseType = type;
      xhr.onload = () => {
        resolve({ body: xhr.response, status: xhr.status });
      };
      xhr.onerror = () => {
        reject({ body: undefined, status: xhr.status });
      };
      try {
        xhr.send();
      } catch (error) {
        reject(error);
      }
    });
  }
  public async post(
    url: string,
    Options: PostRequestOptions
  ): Promise<XMLResponseType> {
    return new Promise((resolve, reject) => {
      if (typeof url !== "string")
        reject("String expected for url arg, received " + typeof url);
      const options = Options ?? {};
      const type = (options.type ?? "text") as XMLHttpRequestResponseType;
      const headers = options.headers ?? {};
      const body = options.body ?? null;
      const xhr = new XMLHttpRequest();
      xhr.open("POST", url);
      Object.keys(headers).forEach((header) => {
        xhr.setRequestHeader(header, headers[header]);
      });
      xhr.responseType = type;
      xhr.onload = () => {
        resolve({ body: xhr.response, status: xhr.status });
      };
      xhr.onerror = () => {
        reject({ body: undefined, status: xhr.status });
      };
      try {
        xhr.send(body);
      } catch (error) {
        reject(error);
      }
    });
  }
}
