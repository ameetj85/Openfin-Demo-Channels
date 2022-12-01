var _childApp, _messageButton, _interAppMessageField;
var _client;


if (window.fin !== undefined) {

  let _interAppMessageField = document.querySelector("#inter-app-message");
  // document.getElementById("inter-app-message");

  document.addEventListener("DOMContentLoaded", function () {
    initChild();
  });

  function initChild() {
    fin.desktop.main(function () {
      initChildWithOpenFin();

      _messageButton = document
        .querySelector("#sendAck")
        .addEventListener("click", function () {
          sendAck();
        });
    });
  }

  initChildWithOpenFin = async function () {
    _childApp = fin.desktop.Window.getCurrent();
    _childApp.show();

    console.log('Waitng to connect to channel...');

    _client = await fin.InterApplicationBus.Channel.connect('arithmetic_op', {
      wait: true
    });

    console.log('Connected to channel.');
    console.log("Channel Information available via returned client using client.providerIdentity : " + JSON.stringify(_client.providerIdentity))

  };

  function setListener() {
    
    var selectedVal = document.getElementById("selectOp").selectedIndex;

    if (selectedVal == 1) {
      _client.register("arithmetic_op_add", (payload, identity) => {
        console.log(
          "Action clientHello called by " +
            JSON.stringify(identity) +
            " with payload: " +
            JSON.stringify(payload)
        );
        _interAppMessageField.InnerText = payload.text + payload.num;
        _interAppMessageField.innerText = payload.text + payload.num;
      });
    } else if (selectedVal == 2) {
      _client.register("arithmetic_op_subtract", (payload, identity) => {
        console.log(
          "Action clientHello called by " +
            JSON.stringify(identity) +
            " with payload: " +
            JSON.stringify(payload)
        );
        _interAppMessageField.innerText = payload.text + payload.num;
      });
    } else if (selectedVal == 3) {
      _client.register("arithmetic_op_multiply", (payload, identity) => {
        console.log(
          "Action clientHello called by " +
            JSON.stringify(identity) +
            " with payload: " +
            JSON.stringify(payload)
        );
        _interAppMessageField.innerText = payload.text + payload.num;
      });
    } else if (selectedVal == 4) {
      _client.register("arithmetic_op_divide", (payload, identity) => {
        console.log(
          "Action clientHello called by " +
            JSON.stringify(identity) +
            " with payload: " +
            JSON.stringify(payload)
        );
        _interAppMessageField.innerText = payload.text + payload.num;
      });
    }
  }

  async function sendAck() {
    var operation = document.getElementById("selectOp").value;

    await _client.dispatch("result", {
      child: _childApp.uuid,
      op: operation,
    });

    console.log(
      "The child " + _childApp.uuid + " acks operation " + "ack_op_" + operation
    );
  }
}