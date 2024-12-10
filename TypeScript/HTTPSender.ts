type RequestOptions = {
  headers?: Record<string, string>;
  type?: type;
};
type type = "json" | "text" | "html";

class HTTPSender {
  constructor() {}
  public async GET(url: string, options: RequestOptions): Promise<any> {
    return new Promise((resolve, reject) => {
      if (typeof url !== "undefined")
        reject("String expected for url arg, received " + typeof url);
      const type = options.type ?? "text";
      const headers = options.headers ?? {};
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      Object.keys(headers).forEach((header) => {
        xhr.setRequestHeader(header, headers[header]);
      });
      xhr.onload = () => {
        switch (type) {
          case "html":
            resolve(xhr.responseXML);
            break;
          case "json":
            try {
              let response = JSON.parse(xhr.responseText);
              resolve(response);
            } catch (e) {
              reject(e);
            }
            break;
          default:
            resolve(xhr.responseText);
            break;
        }
      };
      xhr.onerror = () => {
        reject(xhr.status);
      };
      try {
        xhr.send();
      } catch (error) {
        reject(error);
      }
    });
  }
}
