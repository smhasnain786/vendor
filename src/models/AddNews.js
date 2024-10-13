import { useEffect, useState } from "react"
import { PosterAdd } from "../services/book.service"
import { HotToaster } from "../utils/Toaster"
import { NewsAdd } from "../services/newsletter.service"
import { ResultFunction } from "../comman/resultFunction"

const AddNews = (props) =>{
    const [heading,setHeading] = useState("")
    const [news,setNews] = useState("")

    const handleNewsChange = async() => {
        let data = {
            heading:heading,
            news:news
        }
        let result = await NewsAdd(data)
        ResultFunction(result,props.allNews)
        setHeading("")
        setNews("")
    }

    return (
        <div
        class="modal"
        id="add_news"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog  alert_modal" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle">
                Add News
              </h5>
              <button
                class="btn-close"
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
              <div className="form-group mb-3">
                     <input
                        className="form-control"
                        type="text"
                        placeholder="news heading"
                        name="heading"
                        value={heading}
                        onChange={(e)=>{setHeading(e.target.value)}}
                      />
                    </div>
                <div className="form-group mb-3">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="news"
                        name="news"
                        value={news}
                        onChange={(e)=>{
                            setNews(e.target.value)
                        }}
                      />
                    </div>
                <button
                  class="btn btn-s btn-indigo btn-block w-100"
                  data-bs-dismiss="modal"
                  type="button"
                  onClick={() => handleNewsChange()}
                >
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
            )
}
export default AddNews