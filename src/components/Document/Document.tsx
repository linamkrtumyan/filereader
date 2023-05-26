import React, { useEffect, useState, useRef } from "react";
import Table from "../Table";
import { getDocsVariables } from "../../services/docsApi";
import { generateDocKeys } from "../../utils/generateDocKeys";
import { fetchSheetsData } from "../../services/sheetsApi";

function Document() {
  const [docLink, setDocLink] = useState("");
  const [sheetLink, setSheetLink] = useState("");
  const [htmlchik, setHtmlchik] = useState("");
  const [finalData, setFinalData] = useState([]);
  const [showHtml, setShowHtml] = useState(true);

  const refik = useRef(null);

  useEffect(() => {
    if (docLink) {
      getDocsVariables(docLink).then((res) => setHtmlchik(res));
    }
  }, [docLink]);

  const handleOnChange = (e: any, type: string) => {
    const url = e.target.value;
    const id = url.split("/");
    if (type === "doc") setDocLink(id[5]);
    else {
      localStorage.setItem("sheetId", id[5]);
      setSheetLink(id[5]);
    }
  };

  const handleGenerate = () => {
    setShowHtml(false);
    const keys = generateDocKeys(refik);
    keys.map((key) =>
      fetchSheetsData(...Object.values(key)).then((res: Object) =>
        //@ts-ignore
        setFinalData((oldArray) => [...oldArray, res])
      )
    );
  };

  return (
    <>
      {showHtml && (
        <>
          <p>
            https://drive.google.com/file/d/1TKZFwNdDg-X-DPJiYXjtLC46JkgRjdAI/view
          </p>
          <p>
            https://docs.google.com/spreadsheets/d/1WXp4jZQYbV7a8TG_Merpc6dQ-YuZbYxZC_In6ny5Qkg/edit#gid=0
          </p>
        </>
      )}

      <form>
        <div className="form-group m-2 ">
          <label htmlFor="exampleInputPassword1">Add your docx link:</label>
          <input
            type="url"
            className="form-control"
            onChange={(e) => handleOnChange(e, "doc")}
          />
        </div>

        <div className="form-group m-2">
          <label htmlFor="exampleInputPassword1">Add your sheet link:</label>
          <input
            type="url"
            className="form-control"
            onChange={(e) => handleOnChange(e, "sheet")}
          />
        </div>

        {sheetLink && docLink && (
          <button
            onClick={handleGenerate}
            type="button"
            className="btn btn-primary m-2"
          >
            Generate
          </button>
        )}
      </form>

      {finalData.length > 1 &&
        finalData.map((fd: Array<Object>, index) => {
          if (fd?.length > 1) {
            return (
              <table className="table table-bordered">
                {fd.map((f, ind) => {
                  if (Object.keys(f).length > 1) {
                    return (
                      <>
                        <Table f={f} />
                      </>
                    );
                  }
                })}
              </table>
            );
          } else {
            return fd.map((f, ind) => {
              return (
                <>
                  <p>{Object.values(f)}</p>
                </>
              );
            });
          }
        })}

      {showHtml && (
        <div ref={refik} dangerouslySetInnerHTML={{ __html: htmlchik }} />
      )}
    </>
  );
}

export default Document;
