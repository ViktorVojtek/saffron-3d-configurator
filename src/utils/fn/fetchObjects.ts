export function fetchObjects(url: string): Promise<any> {
  return new Promise(async function (resolve) {
    const response: Response = await fetch(url);
    const data: any = await response.json();

    resolve(data);
  });
}