(function () {
    'use strict';

    angular.module(UCACS.APPLICANT_DIRECTIVE_MODULE).directive("paginator", paginatorDirective);

    function paginatorDirective() {
        return {
            restrict: 'E',
            controller: function ($scope, Paginator) {
                $scope.paginator = Paginator;
            },
            templateUrl: 'Components/Applicant/CoApplicantSearch/paginator.html'
        };
    };

    angular.module(UCACS.APPLICANT_DIRECTIVE_MODULE).filter("paginate", paginateFilter);

    function paginateFilter(Paginator) {
        return function (input, rowsPerPage) {
            if (!input) {
                return input;
            }

            if (rowsPerPage) {
                Paginator.rowsPerPage = rowsPerPage;
            }

            Paginator.itemCount = input.length;

            return input.slice(parseInt(Paginator.page * Paginator.rowsPerPage), parseInt((Paginator.page + 1) * Paginator.rowsPerPage + 1) - 1);
        }
    };

    angular.module(UCACS.APPLICANT_DIRECTIVE_MODULE).filter("forLoop", forLoopFilter);

    function forLoopFilter() {
        return function (input, start, end) {
            input = new Array(end - start);
            for (var i = 0; start < end; start++, i++) {
                input[i] = start;
            }

            return input;
        }
    };

    angular.module(UCACS.APPLICANT_DIRECTIVE_MODULE).service("Paginator", PaginatorService);

    function PaginatorService() {

        this.page = 0;
        this.rowsPerPage = 50;
        this.itemCount = 0;
        this.limitPerPage = 5;

        this.setPage = function (page) {

            if (page > this.pageCount()) {
                return;
            }

            this.page = page;
        };

        this.nextPage = function () {
            if (this.isLastPage()) {
                return;
            }

            this.page++;
        };

        this.perviousPage = function () {
            if (this.isFirstPage()) {
                return;
            }

            this.page--;
        };

        this.firstPage = function () {
            this.page = 0;
        };

        this.lastPage = function () {
            this.page = this.pageCount() - 1;
        };

        this.isFirstPage = function () {
            return this.page == 0;
        };

        this.isLastPage = function () {
            return this.page == this.pageCount() - 1;
        };

        this.pageCount = function () {
            return Math.ceil(parseInt(this.itemCount) / parseInt(this.rowsPerPage));
        };

        this.lowerLimit = function () {
            var pageCountLimitPerPageDiff = this.pageCount() - this.limitPerPage;

            if (pageCountLimitPerPageDiff < 0) {
                return 0;
            }

            if (this.page > pageCountLimitPerPageDiff + 1) {
                return pageCountLimitPerPageDiff;
            }

            var low = this.page - (Math.ceil(this.limitPerPage / 2) - 1);

            return Math.max(low, 0);
        };
    };

}());