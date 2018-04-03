import { Injectable } from '@angular/core';
import { Course } from './course.model';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';

import 'rxjs/add/operator/map';

const AllCoursesQuery = gql``;

const CreateCourseMutation = gql``;

const UpdateCourseMutation = gql``;

const DeleteCourseMutation = gql``;

interface QueryResponse {
  allCourses;
}

@Injectable()
export class CoursesService {
  constructor(private apollo: Apollo) {}

  all() {
    return this.apollo
      .watchQuery<QueryResponse>({
        query: AllCoursesQuery
      })
      .map(({ data }) => data.allCourses);
  }

  create(course: Course) {
    return this.apollo.mutate({
      mutation: CreateCourseMutation,
      variables: {
        name: course.name,
        description: course.description,
        level: course.level
      },
      refetchQueries: [
        {
          query: AllCoursesQuery
        }
      ]
    });
  }

  update(course: Course) {
    return this.apollo.mutate({
      mutation: UpdateCourseMutation,
      variables: {
        id: course.id,
        name: course.name,
        description: course.description,
        level: course.level
      },
      refetchQueries: [
        {
          query: AllCoursesQuery
        }
      ]
    });
  }

  delete(course: Course) {
    console.log(course);
    return this.apollo.mutate({
      mutation: DeleteCourseMutation,
      variables: {
        id: course.id
      },
      refetchQueries: [
        {
          query: AllCoursesQuery
        }
      ]
    });
  }
}
