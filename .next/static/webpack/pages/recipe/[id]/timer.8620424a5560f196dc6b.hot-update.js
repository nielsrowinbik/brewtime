webpackHotUpdate_N_E("pages/recipe/[id]/timer",{

/***/ "./hooks/use-timer.ts":
/*!****************************!*\
  !*** ./hooks/use-timer.ts ***!
  \****************************/
/*! exports provided: useTimer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useTimer", function() { return useTimer; });
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _hooks_use_interval__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../hooks/use-interval */ "./hooks/use-interval.ts");
/* harmony import */ var _hooks_use_previous__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../hooks/use-previous */ "./hooks/use-previous.ts");
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/helpers */ "./utils/helpers.ts");


var _s = $RefreshSig$();

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }





var useTimer = function useTimer(userSteps) {
  _s();

  // // Add a "start" field to every step that was passed in so we
  // // can determine which step is the current:
  var steps = Object(react__WEBPACK_IMPORTED_MODULE_1__["useMemo"])(function () {
    return userSteps.map(function (step, i) {
      return _objectSpread(_objectSpread({}, step), {}, {
        // We convert step duration, which is configured in seconds,
        // to milliseconds here. This overwrites the original duration
        // value!
        duration: step.duration * 1000,
        // The start is determined by the sum of all durations of
        // the previous steps. Once these durations have passed,
        // the current step is active. Finally, subtract 1000 milliseconds
        // to always start a round "early".
        start: userSteps.slice(0, i).reduce(function (total, _ref) {
          var duration = _ref.duration;
          return total + duration * 1000;
        }, 0) - 1000
      });
    });
  }, [userSteps.length]); // Store whether the timer is running in state:

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false),
      isRunning = _useState[0],
      setIsRunning = _useState[1]; // Store both current and previous tick timestamps so we can
  // compute the difference between them:


  var _useState2 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(0),
      currentTick = _useState2[0],
      setCurrentTick = _useState2[1];

  var previousTick = Object(_hooks_use_previous__WEBPACK_IMPORTED_MODULE_3__["usePrevious"])(currentTick); // Store total elapsed time in state:

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(0),
      elapsed = _useState3[0],
      setElapsed = _useState3[1]; // Compute the total time needed to complete this timer:


  var totalTime = Object(react__WEBPACK_IMPORTED_MODULE_1__["useMemo"])(function () {
    return Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_4__["sum"])(Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_4__["valuesForKey"])(userSteps, "duration")) * 1000;
  }, [userSteps.length]); // Compute the remaining time:

  var remaining = Object(react__WEBPACK_IMPORTED_MODULE_1__["useMemo"])(function () {
    return totalTime - elapsed;
  }, [elapsed]); // // Determine whether the timer is complete:

  var isComplete = Object(react__WEBPACK_IMPORTED_MODULE_1__["useMemo"])(function () {
    return remaining <= 0;
  }, [remaining]); // // Compute the current step's index:

  var currentStepIndex = Object(react__WEBPACK_IMPORTED_MODULE_1__["useMemo"])(function () {
    // find the index of the first step that we find of which we have not yet
    // passed the start moment:
    var index = steps.findIndex(function (_ref2) {
      var start = _ref2.start;
      return elapsed < start;
    }); // If found, the current step is the step before the one we found.
    // If not found, we're on the last step.

    return (index === -1 ? steps.length : index) - 1;
  }, [elapsed]); // // Compute how much time is remaining in the current step

  var currentStepRemaining = Object(react__WEBPACK_IMPORTED_MODULE_1__["useMemo"])(function () {
    // Get the sum of durations of all previous steps (excluding current):
    var totalPreviousSteps = Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_4__["sum"])(Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_4__["valuesForKey"])(steps.slice(0, currentStepIndex), "duration")); // Compute the progress within the current step:

    var progressCurrentStep = elapsed - totalPreviousSteps; // Subtract the progress within this step from the total duration:

    return steps[currentStepIndex].duration - progressCurrentStep;
  }, [currentStepIndex, elapsed]); // Every tick, update the current tick in state:

  var tick = function tick() {
    return setCurrentTick(Date.now());
  }; // Tick every 100 millisecons when timer is running:


  Object(_hooks_use_interval__WEBPACK_IMPORTED_MODULE_2__["useInterval"])(tick, isRunning && !isComplete ? 100 : null); // Update the total elapsed time by adding the difference
  // between the current and the previous tick to the previous total:

  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    // Don't update if we're not running:
    if (!isRunning) return; // Don't update if the previous tick was 0:

    if (!previousTick || previousTick === 0) return;
    setElapsed(function (elapsed) {
      return elapsed + (currentTick - previousTick);
    });
  }, [currentTick]); // Expose a method to reset the timer:

  var reset = Object(react__WEBPACK_IMPORTED_MODULE_1__["useCallback"])(function () {
    setIsRunning(false);
    setElapsed(0);
    setCurrentTick(0);
  }, []); // Expose a method to start the timer:

  var start = Object(react__WEBPACK_IMPORTED_MODULE_1__["useCallback"])(function () {
    setCurrentTick(Date.now());
    setIsRunning(true);
  }, []); // Expose a method to stop (pause) the timer:

  var stop = Object(react__WEBPACK_IMPORTED_MODULE_1__["useCallback"])(function () {
    setIsRunning(false); // FIXME: this fixes pause functionality, but we don't count the time between the last tick and us pausing the timer

    setCurrentTick(0);
  }, []); // Expose a method to toggle the timer:

  var toggle = Object(react__WEBPACK_IMPORTED_MODULE_1__["useCallback"])(function () {
    if (isRunning) return stop();
    return start();
  }, [isRunning]);
  return {
    currentStepIndex: currentStepIndex,
    currentStepRemaining: currentStepRemaining,
    elapsed: elapsed,
    isComplete: isComplete,
    isRunning: isRunning,
    remaining: remaining,
    reset: reset,
    start: start,
    stop: stop,
    toggle: toggle
  };
};

_s(useTimer, "BGqtAGUMXs+yNAH84oP19zy1tUw=", false, function () {
  return [_hooks_use_previous__WEBPACK_IMPORTED_MODULE_3__["usePrevious"], _hooks_use_interval__WEBPACK_IMPORTED_MODULE_2__["useInterval"]];
});

;
    var _a, _b;
    // Legacy CSS implementations will `eval` browser code in a Node.js context
    // to extract CSS. For backwards compatibility, we need to check we're in a
    // browser context before continuing.
    if (typeof self !== 'undefined' &&
        // AMP / No-JS mode does not inject these helpers:
        '$RefreshHelpers$' in self) {
        var currentExports = module.__proto__.exports;
        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;
        // This cannot happen in MainTemplate because the exports mismatch between
        // templating and execution.
        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);
        // A module can be accepted automatically based on its exports, e.g. when
        // it is a Refresh Boundary.
        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
            // Save the previous exports on update so we can compare the boundary
            // signatures.
            module.hot.dispose(function (data) {
                data.prevExports = currentExports;
            });
            // Unconditionally accept an update to this module, we'll check if it's
            // still a Refresh Boundary later.
            module.hot.accept();
            // This field is set when the previous version of this module was a
            // Refresh Boundary, letting us know we need to check for invalidation or
            // enqueue an update.
            if (prevExports !== null) {
                // A boundary can become ineligible if its exports are incompatible
                // with the previous exports.
                //
                // For example, if you add/remove/change exports, we'll want to
                // re-execute the importing modules, and force those components to
                // re-render. Similarly, if you convert a class component to a
                // function, we want to invalidate the boundary.
                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {
                    module.hot.invalidate();
                }
                else {
                    self.$RefreshHelpers$.scheduleUpdate();
                }
            }
        }
        else {
            // Since we just executed the code for the module, it's possible that the
            // new exports made it ineligible for being a boundary.
            // We only care about the case when we were _previously_ a boundary,
            // because we already accepted this update (accidental side effect).
            var isNoLongerABoundary = prevExports !== null;
            if (isNoLongerABoundary) {
                module.hot.invalidate();
            }
        }
    }

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vaG9va3MvdXNlLXRpbWVyLnRzIl0sIm5hbWVzIjpbInVzZVRpbWVyIiwidXNlclN0ZXBzIiwic3RlcHMiLCJ1c2VNZW1vIiwibWFwIiwic3RlcCIsImkiLCJkdXJhdGlvbiIsInN0YXJ0Iiwic2xpY2UiLCJyZWR1Y2UiLCJ0b3RhbCIsImxlbmd0aCIsInVzZVN0YXRlIiwiaXNSdW5uaW5nIiwic2V0SXNSdW5uaW5nIiwiY3VycmVudFRpY2siLCJzZXRDdXJyZW50VGljayIsInByZXZpb3VzVGljayIsInVzZVByZXZpb3VzIiwiZWxhcHNlZCIsInNldEVsYXBzZWQiLCJ0b3RhbFRpbWUiLCJzdW0iLCJ2YWx1ZXNGb3JLZXkiLCJyZW1haW5pbmciLCJpc0NvbXBsZXRlIiwiY3VycmVudFN0ZXBJbmRleCIsImluZGV4IiwiZmluZEluZGV4IiwiY3VycmVudFN0ZXBSZW1haW5pbmciLCJ0b3RhbFByZXZpb3VzU3RlcHMiLCJwcm9ncmVzc0N1cnJlbnRTdGVwIiwidGljayIsIkRhdGUiLCJub3ciLCJ1c2VJbnRlcnZhbCIsInVzZUVmZmVjdCIsInJlc2V0IiwidXNlQ2FsbGJhY2siLCJzdG9wIiwidG9nZ2xlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBRUE7QUFDQTtBQUNBO0FBT08sSUFBTUEsUUFBUSxHQUFHLFNBQVhBLFFBQVcsQ0FBQ0MsU0FBRCxFQUF1QjtBQUFBOztBQUMzQztBQUNBO0FBQ0EsTUFBTUMsS0FBSyxHQUFHQyxxREFBTyxDQUNqQjtBQUFBLFdBQ0lGLFNBQVMsQ0FBQ0csR0FBVixDQUFjLFVBQUNDLElBQUQsRUFBT0MsQ0FBUDtBQUFBLDZDQUVQRCxJQUZPO0FBSVY7QUFDQTtBQUNBO0FBQ0FFLGdCQUFRLEVBQUVGLElBQUksQ0FBQ0UsUUFBTCxHQUFnQixJQVBoQjtBQVNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0FDLGFBQUssRUFDRFAsU0FBUyxDQUNKUSxLQURMLENBQ1cs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R3ZCLENBQUNNLFNBQUQsQ0FIdUIsQ0FBMUI7QUFLQSxTQUFPO0FBQ0hhLG9CQUFnQixFQUFoQkEsZ0JBREc7QUFFSEcsd0JBQW9CLEVBQXBCQSxvQkFGRztBQUdIVixXQUFPLEVBQVBBLE9BSEc7QUFJSE0sY0FBVSxFQUFWQSxVQUpHO0FBS0haLGFBQVMsRUFBVEEsU0FMRztBQU1IVyxhQUFTLEVBQVRBLFNBTkc7QUFPSGEsU0FBSyxFQUFMQSxLQVBHO0FBUUg5QixTQUFLLEVBQUxBLEtBUkc7QUFTSGdDLFFBQUksRUFBSkEsSUFURztBQVVIQyxVQUFNLEVBQU5BO0FBVkcsR0FBUDtBQVlILENBcElNOztHQUFNekMsUTtVQW1DWW1CLCtELEVBNkNyQmlCLCtEIiwiZmlsZSI6InN0YXRpYy93ZWJwYWNrL3BhZ2VzL3JlY2lwZS9baWRdL3RpbWVyLjg2MjA0MjRhNTU2MGYxOTZkYzZiLmhvdC11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlU3RhdGUsIHVzZU1lbW8sIHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xuXG5pbXBvcnQgeyB1c2VJbnRlcnZhbCB9IGZyb20gXCIuLi9ob29rcy91c2UtaW50ZXJ2YWxcIjtcbmltcG9ydCB7IHVzZVByZXZpb3VzIH0gZnJvbSBcIi4uL2hvb2tzL3VzZS1wcmV2aW91c1wiO1xuaW1wb3J0IHsgc3VtLCB2YWx1ZXNGb3JLZXkgfSBmcm9tIFwiLi4vdXRpbHMvaGVscGVyc1wiO1xuXG50eXBlIFN0ZXAgPSB7XG4gICAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgICBkdXJhdGlvbjogbnVtYmVyO1xufTtcblxuZXhwb3J0IGNvbnN0IHVzZVRpbWVyID0gKHVzZXJTdGVwczogU3RlcFtdKSA9PiB7XG4gICAgLy8gLy8gQWRkIGEgXCJzdGFydFwiIGZpZWxkIHRvIGV2ZXJ5IHN0ZXAgdGhhdCB3YXMgcGFzc2VkIGluIHNvIHdlXG4gICAgLy8gLy8gY2FuIGRldGVybWluZSB3aGljaCBzdGVwIGlzIHRoZSBjdXJyZW50OlxuICAgIGNvbnN0IHN0ZXBzID0gdXNlTWVtbyhcbiAgICAgICAgKCkgPT5cbiAgICAgICAgICAgIHVzZXJTdGVwcy5tYXAoKHN0ZXAsIGkpID0+ICh7XG4gICAgICAgICAgICAgICAgLy8gV2UgY29weSB0aGUgb3JpZ2luYWwgc3RlcCBhcyBub3QgdG8gbG9zZSBhbnkgbmZvcm1hdGlvbi5cbiAgICAgICAgICAgICAgICAuLi5zdGVwLFxuXG4gICAgICAgICAgICAgICAgLy8gV2UgY29udmVydCBzdGVwIGR1cmF0aW9uLCB3aGljaCBpcyBjb25maWd1cmVkIGluIHNlY29uZHMsXG4gICAgICAgICAgICAgICAgLy8gdG8gbWlsbGlzZWNvbmRzIGhlcmUuIFRoaXMgb3ZlcndyaXRlcyB0aGUgb3JpZ2luYWwgZHVyYXRpb25cbiAgICAgICAgICAgICAgICAvLyB2YWx1ZSFcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogc3RlcC5kdXJhdGlvbiAqIDEwMDAsXG5cbiAgICAgICAgICAgICAgICAvLyBUaGUgc3RhcnQgaXMgZGV0ZXJtaW5lZCBieSB0aGUgc3VtIG9mIGFsbCBkdXJhdGlvbnMgb2ZcbiAgICAgICAgICAgICAgICAvLyB0aGUgcHJldmlvdXMgc3RlcHMuIE9uY2UgdGhlc2UgZHVyYXRpb25zIGhhdmUgcGFzc2VkLFxuICAgICAgICAgICAgICAgIC8vIHRoZSBjdXJyZW50IHN0ZXAgaXMgYWN0aXZlLiBGaW5hbGx5LCBzdWJ0cmFjdCAxMDAwIG1pbGxpc2Vjb25kc1xuICAgICAgICAgICAgICAgIC8vIHRvIGFsd2F5cyBzdGFydCBhIHJvdW5kIFwiZWFybHlcIi5cbiAgICAgICAgICAgICAgICBzdGFydDpcbiAgICAgICAgICAgICAgICAgICAgdXNlclN0ZXBzXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2xpY2UoMCwgaSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZWR1Y2UoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHRvdGFsLCB7IGR1cmF0aW9uIH0pID0+IHRvdGFsICsgZHVyYXRpb24gKiAxMDAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgICAgICAgICAgICAgICkgLSAxMDAwLFxuICAgICAgICAgICAgfSkpLFxuICAgICAgICBbdXNlclN0ZXBzLmxlbmd0aF1cbiAgICApO1xuXG4gICAgLy8gU3RvcmUgd2hldGhlciB0aGUgdGltZXIgaXMgcnVubmluZyBpbiBzdGF0ZTpcbiAgICBjb25zdCBbaXNSdW5uaW5nLCBzZXRJc1J1bm5pbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gICAgLy8gU3RvcmUgYm90aCBjdXJyZW50IGFuZCBwcmV2aW91cyB0aWNrIHRpbWVzdGFtcHMgc28gd2UgY2FuXG4gICAgLy8gY29tcHV0ZSB0aGUgZGlmZmVyZW5jZSBiZXR3ZWVuIHRoZW06XG4gICAgY29uc3QgW2N1cnJlbnRUaWNrLCBzZXRDdXJyZW50VGlja10gPSB1c2VTdGF0ZSgwKTtcbiAgICBjb25zdCBwcmV2aW91c1RpY2sgPSB1c2VQcmV2aW91cyhjdXJyZW50VGljayk7XG5cbiAgICAvLyBTdG9yZSB0b3RhbCBlbGFwc2VkIHRpbWUgaW4gc3RhdGU6XG4gICAgY29uc3QgW2VsYXBzZWQsIHNldEVsYXBzZWRdID0gdXNlU3RhdGUoMCk7XG5cbiAgICAvLyBDb21wdXRlIHRoZSB0b3RhbCB0aW1lIG5lZWRlZCB0byBjb21wbGV0ZSB0aGlzIHRpbWVyOlxuICAgIGNvbnN0IHRvdGFsVGltZSA9IHVzZU1lbW8oXG4gICAgICAgICgpID0+IHN1bSh2YWx1ZXNGb3JLZXkodXNlclN0ZXBzLCBcImR1cmF0aW9uXCIpKSAqIDEwMDAsXG4gICAgICAgIFt1c2VyU3RlcHMubGVuZ3RoXVxuICAgICk7XG5cbiAgICAvLyBDb21wdXRlIHRoZSByZW1haW5pbmcgdGltZTpcbiAgICBjb25zdCByZW1haW5pbmcgPSB1c2VNZW1vKCgpID0+IHRvdGFsVGltZSAtIGVsYXBzZWQsIFtlbGFwc2VkXSk7XG5cbiAgICAvLyAvLyBEZXRlcm1pbmUgd2hldGhlciB0aGUgdGltZXIgaXMgY29tcGxldGU6XG4gICAgY29uc3QgaXNDb21wbGV0ZSA9IHVzZU1lbW8oKCkgPT4gcmVtYWluaW5nIDw9IDAsIFtyZW1haW5pbmddKTtcblxuICAgIC8vIC8vIENvbXB1dGUgdGhlIGN1cnJlbnQgc3RlcCdzIGluZGV4OlxuICAgIGNvbnN0IGN1cnJlbnRTdGVwSW5kZXggPSB1c2VNZW1vKCgpID0+IHtcbiAgICAgICAgLy8gZmluZCB0aGUgaW5kZXggb2YgdGhlIGZpcnN0IHN0ZXAgdGhhdCB3ZSBmaW5kIG9mIHdoaWNoIHdlIGhhdmUgbm90IHlldFxuICAgICAgICAvLyBwYXNzZWQgdGhlIHN0YXJ0IG1vbWVudDpcbiAgICAgICAgY29uc3QgaW5kZXggPSBzdGVwcy5maW5kSW5kZXgoKHsgc3RhcnQgfSkgPT4gZWxhcHNlZCA8IHN0YXJ0KTtcblxuICAgICAgICAvLyBJZiBmb3VuZCwgdGhlIGN1cnJlbnQgc3RlcCBpcyB0aGUgc3RlcCBiZWZvcmUgdGhlIG9uZSB3ZSBmb3VuZC5cbiAgICAgICAgLy8gSWYgbm90IGZvdW5kLCB3ZSdyZSBvbiB0aGUgbGFzdCBzdGVwLlxuICAgICAgICByZXR1cm4gKGluZGV4ID09PSAtMSA/IHN0ZXBzLmxlbmd0aCA6IGluZGV4KSAtIDE7XG4gICAgfSwgW2VsYXBzZWRdKTtcblxuICAgIC8vIC8vIENvbXB1dGUgaG93IG11Y2ggdGltZSBpcyByZW1haW5pbmcgaW4gdGhlIGN1cnJlbnQgc3RlcFxuICAgIGNvbnN0IGN1cnJlbnRTdGVwUmVtYWluaW5nID0gdXNlTWVtbygoKSA9PiB7XG4gICAgICAgIC8vIEdldCB0aGUgc3VtIG9mIGR1cmF0aW9ucyBvZiBhbGwgcHJldmlvdXMgc3RlcHMgKGV4Y2x1ZGluZyBjdXJyZW50KTpcbiAgICAgICAgY29uc3QgdG90YWxQcmV2aW91c1N0ZXBzID0gc3VtKFxuICAgICAgICAgICAgdmFsdWVzRm9yS2V5KHN0ZXBzLnNsaWNlKDAsIGN1cnJlbnRTdGVwSW5kZXgpLCBcImR1cmF0aW9uXCIpXG4gICAgICAgICk7XG4gICAgICAgIC8vIENvbXB1dGUgdGhlIHByb2dyZXNzIHdpdGhpbiB0aGUgY3VycmVudCBzdGVwOlxuICAgICAgICBjb25zdCBwcm9ncmVzc0N1cnJlbnRTdGVwID0gZWxhcHNlZCAtIHRvdGFsUHJldmlvdXNTdGVwcztcblxuICAgICAgICAvLyBTdWJ0cmFjdCB0aGUgcHJvZ3Jlc3Mgd2l0aGluIHRoaXMgc3RlcCBmcm9tIHRoZSB0b3RhbCBkdXJhdGlvbjpcbiAgICAgICAgcmV0dXJuIHN0ZXBzW2N1cnJlbnRTdGVwSW5kZXhdLmR1cmF0aW9uIC0gcHJvZ3Jlc3NDdXJyZW50U3RlcDtcbiAgICB9LCBbY3VycmVudFN0ZXBJbmRleCwgZWxhcHNlZF0pO1xuXG4gICAgLy8gRXZlcnkgdGljaywgdXBkYXRlIHRoZSBjdXJyZW50IHRpY2sgaW4gc3RhdGU6XG4gICAgY29uc3QgdGljayA9ICgpID0+IHNldEN1cnJlbnRUaWNrKERhdGUubm93KCkpO1xuXG4gICAgLy8gVGljayBldmVyeSAxMDAgbWlsbGlzZWNvbnMgd2hlbiB0aW1lciBpcyBydW5uaW5nOlxuICAgIHVzZUludGVydmFsKHRpY2ssIGlzUnVubmluZyAmJiAhaXNDb21wbGV0ZSA/IDEwMCA6IG51bGwpO1xuXG4gICAgLy8gVXBkYXRlIHRoZSB0b3RhbCBlbGFwc2VkIHRpbWUgYnkgYWRkaW5nIHRoZSBkaWZmZXJlbmNlXG4gICAgLy8gYmV0d2VlbiB0aGUgY3VycmVudCBhbmQgdGhlIHByZXZpb3VzIHRpY2sgdG8gdGhlIHByZXZpb3VzIHRvdGFsOlxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIC8vIERvbid0IHVwZGF0ZSBpZiB3ZSdyZSBub3QgcnVubmluZzpcbiAgICAgICAgaWYgKCFpc1J1bm5pbmcpIHJldHVybjtcblxuICAgICAgICAvLyBEb24ndCB1cGRhdGUgaWYgdGhlIHByZXZpb3VzIHRpY2sgd2FzIDA6XG4gICAgICAgIGlmICghcHJldmlvdXNUaWNrIHx8IHByZXZpb3VzVGljayA9PT0gMCkgcmV0dXJuO1xuXG4gICAgICAgIHNldEVsYXBzZWQoKGVsYXBzZWQpID0+IGVsYXBzZWQgKyAoY3VycmVudFRpY2sgLSBwcmV2aW91c1RpY2spKTtcbiAgICB9LCBbY3VycmVudFRpY2tdKTtcblxuICAgIC8vIEV4cG9zZSBhIG1ldGhvZCB0byByZXNldCB0aGUgdGltZXI6XG4gICAgY29uc3QgcmVzZXQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgICAgIHNldElzUnVubmluZyhmYWxzZSk7XG4gICAgICAgIHNldEVsYXBzZWQoMCk7XG4gICAgICAgIHNldEN1cnJlbnRUaWNrKDApO1xuICAgIH0sIFtdKTtcblxuICAgIC8vIEV4cG9zZSBhIG1ldGhvZCB0byBzdGFydCB0aGUgdGltZXI6XG4gICAgY29uc3Qgc3RhcnQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgICAgIHNldEN1cnJlbnRUaWNrKERhdGUubm93KCkpO1xuICAgICAgICBzZXRJc1J1bm5pbmcodHJ1ZSk7XG4gICAgfSwgW10pO1xuXG4gICAgLy8gRXhwb3NlIGEgbWV0aG9kIHRvIHN0b3AgKHBhdXNlKSB0aGUgdGltZXI6XG4gICAgY29uc3Qgc3RvcCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICAgICAgc2V0SXNSdW5uaW5nKGZhbHNlKTtcbiAgICAgICAgLy8gRklYTUU6IHRoaXMgZml4ZXMgcGF1c2UgZnVuY3Rpb25hbGl0eSwgYnV0IHdlIGRvbid0IGNvdW50IHRoZSB0aW1lIGJldHdlZW4gdGhlIGxhc3QgdGljayBhbmQgdXMgcGF1c2luZyB0aGUgdGltZXJcbiAgICAgICAgc2V0Q3VycmVudFRpY2soMCk7XG4gICAgfSwgW10pO1xuXG4gICAgLy8gRXhwb3NlIGEgbWV0aG9kIHRvIHRvZ2dsZSB0aGUgdGltZXI6XG4gICAgY29uc3QgdG9nZ2xlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgICAgICBpZiAoaXNSdW5uaW5nKSByZXR1cm4gc3RvcCgpO1xuICAgICAgICByZXR1cm4gc3RhcnQoKTtcbiAgICB9LCBbaXNSdW5uaW5nXSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjdXJyZW50U3RlcEluZGV4LFxuICAgICAgICBjdXJyZW50U3RlcFJlbWFpbmluZyxcbiAgICAgICAgZWxhcHNlZCxcbiAgICAgICAgaXNDb21wbGV0ZSxcbiAgICAgICAgaXNSdW5uaW5nLFxuICAgICAgICByZW1haW5pbmcsXG4gICAgICAgIHJlc2V0LFxuICAgICAgICBzdGFydCxcbiAgICAgICAgc3RvcCxcbiAgICAgICAgdG9nZ2xlLFxuICAgIH07XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==