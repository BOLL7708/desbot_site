var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Site = /** @class */ (function () {
    function Site() {
    }
    Site.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('Site is running!');
                        this._infoLeft = document.querySelector('.box.left');
                        this._infoRight = document.querySelector('.box.right');
                        return [4 /*yield*/, this.loadReleaseData()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, void 0];
                }
            });
        });
    };
    Site.loadReleaseData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cached, url, response, releases, latest, message, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cached = this.getCachedResponse();
                        if (cached) {
                            console.log('Using cached release!');
                            this.updateBoxes(cached);
                        }
                        url = 'https://api.github.com/repos/boll7708/desbot/releases';
                        return [4 /*yield*/, fetch(url)];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2:
                        releases = _a.sent();
                        if (releases) {
                            latest = releases.reduce(function (a, b) { return a.id > b.id ? a : b; });
                            this.setCachedResponse(latest);
                            this.updateBoxes(latest);
                        }
                        else {
                            message = 'Failed to decode release data from GitHub';
                            console.warn(message);
                            if (!cached) {
                                this.setError(this._infoLeft, message);
                                this.setError(this._infoRight, message);
                            }
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        message = 'Failed to load release data from GitHub';
                        console.warn(message);
                        if (!cached) {
                            this.setError(this._infoLeft, message);
                            this.setError(this._infoRight, message);
                        }
                        _a.label = 4;
                    case 4: return [2 /*return*/, true];
                }
            });
        });
    };
    Site.updateBoxes = function (release) {
        this.setInfo(this._infoLeft, [
            '<h2>Latest release</h2>',
            "Link: <a href=\"".concat(release.html_url, "\">").concat(release.tag_name, "</a>"),
            "Title: ".concat(release.name),
            'Date: ' + new Date(release.published_at).toISOString().split('T')[0],
            'Pre-release: ' + (release.prerelease ? 'Yes' : 'No'),
            "Source: <a href=\"".concat(release.zipball_url, "\">.zip</a>, <a href=\"").concat(release.tarball_url, "\">.tar</a>")
        ]);
        this.setInfo(this._infoRight, [
            '<h2>Maintainer</h2>',
            "Profile: <a href=\"".concat(release.author.html_url, "\">").concat(release.author.login, "</a> <img src=\"").concat(release.author.avatar_url, "\" alt=\"Avatar\" width=\"16\" height=\"16\">")
        ]);
    };
    Site.setInfo = function (info, lines) {
        info.innerHTML = '<p>' + lines.join('<p/><p>') + '</p>';
    };
    Site.setError = function (element, message) {
        element.innerHTML = message !== null && message !== void 0 ? message : 'Failed to load release data from GitHub';
    };
    Site.setCachedResponse = function (release) {
        localStorage.setItem('release', JSON.stringify(release));
    };
    Site.getCachedResponse = function () {
        var text = localStorage.getItem('release');
        if (!text)
            return null;
        return JSON.parse(text);
    };
    return Site;
}());
//# sourceMappingURL=site.js.map