// First, define some constants for your SharePoint site
const siteUrl = "https://studentsiusedu.sharepoint.com/sites/DMS/Shared%20Documents/Forms/AllItems.aspx";
const listName = "Documents";
const credentials = btoa("<?>");

// Define a function to retrieve files from SharePoint
export async function getFiles() {
  const endpointUrl = `${siteUrl}/_api/web/lists/getbytitle('${listName}')/items?$select=FileLeafRef`;

  const response = await fetch(endpointUrl, {
    headers: {
      "accept": "application/json;odata=verbose",
    "authorization": `Basic ${credentials}`,
    "Access-Control-Allow-Origin": "null"
    }
  });

  const data = await response.json();
  const files = data.d.results.map((result) => result.FileLeafRef);

  return files;
}

// Define a function to upload a file to SharePoint
export async function uploadFile(fileName, fileContent) {
  const endpointUrl = `${siteUrl}/_api/web/lists/getbytitle('${listName}')/rootfolder/files/add(url='${fileName}',overwrite=true)`;

  const response = await fetch(endpointUrl, {
    method: "POST",
    headers: {
      "accept": "application/json;odata=verbose",
      "content-type": "application/octet-stream",
    },
    body: fileContent,
  });

  const data = await response.json();
  return data.d;
}